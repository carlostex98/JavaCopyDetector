/* Definición Léxica */
%{
	//nuestras estructuras
    let errores =[];
    let nombres=[];
    function in_err(tipo, lin, col, decrip){
        var c = {errores.length, tipo, lin,col, decrip};
        errores.push(c);
    }
    function in_var(tipo, nombre){
        var c = {tipo, nombre};
        nombres.push(c);
    }
%}


%lex

%options case-sensitive

%%
\s+                                             //cspace
"//".*	                                        //comentario 1 linea
[/][*].*[*][/]                                  //ceomntario multilinea

"class"                 return 'CLASS';
"import"                return 'IMPORT';
"String"                return 'STRING';
"char"                  return 'CHAR';
"int                    return 'INT';
"double"                return 'DOUBLE';
"boolean"               return 'BOOLEAN';
"true"                  return 'TRUE';
"false"                 return 'FALSE';
"if"                    return 'IF';
"else"                  return 'ELSE';
"Switch"                return 'SWITCH';
"case"                  return 'CASE';
"default"               return 'DEFAULT';
"break"                 return 'BREAK';
"while"                 return 'WHILE';
"do"                    return 'DO';
"for"                   return 'FOR';
"void"                  return 'VOID';
"return"                return 'RETURN';
"System"                return 'SYSTEM';
"out"                   return 'OUT';
"println"               return 'PRINTLN';
"print"                 return 'PRINT';
"continue"              return 'CONTINUE';
"+"                     return 'MAS';
"-"                     return 'MENOS';
"*"                     return 'POR';
"/"                     return 'DIV';
"++"                    return 'MASM';
"--"                    return 'MENOSM';
"("                     return 'PAR_A';
")"                     return 'PAR_C';
"["                     return 'CORCH_A';
"]"                     return 'CORCH_C';
"{"                     return 'LLAVE_A';
"}"                     return 'LLAVE_C';
"."                     return 'PUNTO';
";"                     return 'PUNTO_C';
":"                     return 'POW';
">"                     return 'MAYOR';
"<"                     return 'MENOR';
">="                    return 'MAYOR_I';
"<="                    return 'MENOR_I';
"="                     return 'IGUAL';
"=="                    return 'IGUAL_IGUAL';
"!"                     return 'NOT';
"!="                    return 'NO_IGUAL';
","                     return 'COMA';
"&&"                    return 'AND';
"||"                    return 'OR';
"^"                     return 'POW';
\"[^\"]*\"				{ yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
[0-9]+("."[0-9]+)?\b  	return 'DECIMAL';
[0-9]+\b				return 'ENTERO';
([a-zA-Z])[a-zA-Z0-9_]*	return 'IDENTIFICADOR';
<<EOF>>				    return 'EOF';
.					    { in_err("Lexico", yylloc.first_line,yylloc.first_column, "El caracter("+yytext+")no pertenece al lenguaje"); }

/lex
%{
	const TIPO_OPERACION	= require('./instrucciones').TIPO_OPERACION;
	const TIPO_VALOR 		= require('./instrucciones').TIPO_VALOR;
	const instruccionesAPI	= require('./instrucciones').instruccionesAPI;
%}


%start ini

%% /* gramar def */

ini
	: instrucciones EOF {
		return {$1,errores, nombre};
	}
;
instrucciones
	: instrucciones instr_main 	{ $1.push($2); $$ = $1; }
	| instr_main				{ $$ = [$1]; }
;


instr_main
	: IMPORT IDENTIFICADOR PUNTO_C 	{ $$ = instruccionesAPI.nuevoImport($2); } 
    | CLASS IDENTIFICADOR LLAVE_A instr_methods LLAVE_C 	{ $$ = instruccionesAPI.nuevoClass($4); } 	
	| error { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); }
;

instr_methods
    :instr_methods instr_meth   {$1.push($2); $$ = $1; }
    |instr_meth                 {$$ = [$1];}
;
instr_meth
    : VOID IDENTIFICADOR PAR_A params PAR_C LLAVE_A instr_general LLAVE_C {$$=instruccionesAPI.nuevoMetodo($2,$4)}
    | typo_var IDENTIFICADOR PAR_A params PAR_C LLAVE_A instr_general LLAVE_C {$$=instruccionesAPI.nuevoFuncion($2,$4,$1)}
;


instr_general
    : instr_general instr	{ $1.push($2); $$ = $1; }
    | instr                 { $$ = [$1]; }
;
//normal
instr
    : IF PAR_A declaracion PAR_C LLAVE_A instr_general LLAVE_C {$$=instruccionesAPI.nuevoIf($3,$6)}
    | ELSE IF PAR_A declaracion PAR_C LLAVE_A instr_general LLAVE_C {$$=instruccionesAPI.nuevoElseIf($4,$7)}
    | ELSE LLAVE_A instr_general LLAVE_C {$$=instruccionesAPI.nuevoElse($3)}
    | WHILE PAR_A declaracion PAR_C LLAVE_A instr_general LLAVE_C {$$=instruccionesAPI.nuevoWhile($3,$6)}
    | DO LLAVE_A instr_general LLAVE_C WHILE PAR_A declaracion PAR_C PUNTO_C {$$=instruccionesAPI.nuevoDoWhile($7,$3)}
    | SYSTEM PUNTO OUT otro_print PAR_A asignacion PAR_C PUNTO_C  {$$=instruccionesAPI.nuevoPrint($6,$4)}
    | IDENTIFICADOR otro_asig PUNTO_C{}
    | FOR PAR_A var_for PUNTO_C asignacion PUNTO_C asignacion PAR_C LLAVE_A instr_general LLAVE_C {$$=instruccionesAPI.nuevoFor($3,$5,$7,$10)}
    | typo_var IDENTIFICADOR IGUAL asignacion PUNTO_C {$$=instruccionesAPI.nuevoVal($1,$2,$4);}
    | BREAK PUNTO_C {$$=instruccionesAPI.nuevoBreak()}
    | RETURN asignacion PUNTO_C {$$=instruccionesAPI.nuevoReturn($2)}
    | CONTINUE PUNTO_C {$$=instruccionesAPI.nuevoContinue()}
;

var_for
    : typo_var IDENTIFICADOR IGUAL asignacion {$$=[$2,$4];}
    | IDENTIFICADOR IGUAL asignacion {$$=[$1,$3]}
;

otro_asig
    : PAR_A params2 PAR_C{}
    | IGUAL asignacion{}
;
params2
    :
;

typo_var
    : INT       {$$=$1}
    | DOUBLE    {$$=$1}
    | STRING    {$$=$1}
    | CHAR      {$$=$1}
    | BOOLEAN   {$$=$1}
;

otro_print
    : PRINT {$$=$1}
    | PRINTLN {$$=$1}
;

asignacion
    :
;

params
    :
;

params2
    :
;

