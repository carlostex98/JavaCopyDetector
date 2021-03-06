/* Definición Léxica */
%{
	//nuestras estructuras
    let errores =[];
    let nombres=[];
    
    function in_err(tipo, lin, col, decrip){
        var c={id:errores.length, tipo:tipo, linea:lin, columna:col, descripcion:decrip};
        errores.push(c);
    }
    function in_var(tipo, nombre){
        var c = {tipo:tipo, nombre:nombre};
        nombres.push(c);
    }

    function clear_vars(){
        errores=[];
        nombres=[];
    }
%}


%lex

%options case-sensitive

%%
\s+                      {}                       
"//".*	                  {}                      
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]	       {}
"class"                 {return 'CLASS';}
"import"                {return 'IMPORT';}
"String"                {return 'STRING';}
"char"                  {return 'CHAR';}
"int"                    {return 'INT';}
"double"                {return 'DOUBLE';}
"boolean"               {return 'BOOLEAN';}
"true"                  {return 'TRUE';}
"false"                 {return 'FALSE';}
"if"                    {return 'IF';}
"else"                  {return 'ELSE';}
"switch"                {return 'SWITCH';}
"case"                  {return 'CASE';}
"default"               {return 'DEFAULT';}
"break"                 {return 'BREAK';}
"while"                 {return 'WHILE';}
"do"                    {return 'DO';}
"for"                   {return 'FOR';}
"void"                  {return 'VOID';}
"return"                {return 'RETURN';}
"System"                {return 'SYSTEM';}
"out"                   {return 'OUT';}
"println"               {return 'PRINTLN';}
"main"                  {return 'MAIN';}
"print"                 {return 'PRINT';}
"continue"              {return 'CONTINUE';}
"+"                     {return 'MAS';}
"-"                     {return 'MENOS';}
"*"                     {return 'POR';}
"/"                     {return 'DIV';}
"++"                    {return 'MASM';}
"--"                    {return 'MENOSM';}
"("                     {return 'PAR_A';}
")"                     {return 'PAR_C';}
'{'                     {return 'LLAVE_A';}
'}'                   {return 'LLAVE_C';}
'.'                     {return 'PUNTO';}
";"                     {return 'PUNTO_C';}
":"                     {return 'DOS_P';}
">"                     {return 'MAYOR';}
'<'                     {return 'MENOR'};
">="                    {return 'MAYOR_I';}
'<='                    {return 'MENOR_I';}
"="                     {return 'IGUAL';}
"=="                    {return 'IGUAL_IGUAL';}
"!"                     {return 'NOT';}
'%'                     {return 'MOD';}
"!="                    {return 'NO_IGUAL';}
','                     {return 'COMA'};
"&&"                    {return 'AND';}
"||"                    {return 'OR';}
"^"                     {return 'POW';}
\"[^\"]*\"				{ yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
[0-9]+"."[0-9]+  	{return 'DECIMAL';}
[0-9]+				{return 'ENTERO';}
([a-zA-Z])[a-zA-Z0-9_]*	{return 'IDENTIFICADOR';}
<<EOF>>				    {return 'EOF';}
.					    { in_err("Lexico", yylloc.first_line,yylloc.first_column, "El caracter("+yytext+")no pertenece al lenguaje"); }

/lex
%{
	const TIPO_OPERACION	= require('./instr').TIPO_OPERACION;
	const TIPO_VAL		= require('./instr').TIPO_VAL;
	const instruccionesAPI	= require('./instr').instruccionesAPI;
    module.exports.clear_vars=clear_vars;
%}


%start ini

%% /* gramar def */

ini
	: instrucciones EOF {return [$1,errores, nombres];}
;
instrucciones
	: instrucciones instr_main 	{ $1.push($2); $$ = $1; }
	| instr_main				{ $$ = [$1]; }
;


instr_main
	: IMPORT asignacion PUNTO_C 	{ $$ = instruccionesAPI.nuevoImport($2); } 
    | CLASS IDENTIFICADOR LLAVE_A instr_methods LLAVE_C 	{ $$ = instruccionesAPI.nuevoClass($2,$4); in_var("Class", $2);} 	
	| error LLAVE_C{  in_err("Sintactico",this._$.first_line,this._$.first_column,yytext); }
;

instr_methods
    :instr_methods instr_meth   {$1.push($2); $$ = $1; }
    |instr_meth                 {$$ = [$1];}
;
instr_meth
    : VOID IDENTIFICADOR PAR_A params PAR_C LLAVE_A instr_general LLAVE_C {$$=instruccionesAPI.nuevoMetodo($2,$4,$7); in_var("Void", $2);}
    | typo_var IDENTIFICADOR PAR_A params PAR_C LLAVE_A instr_general LLAVE_C {$$=instruccionesAPI.nuevoFuncion($2,$4,$1,$7); in_var("Funcion", $2);}
    | VOID MAIN PAR_A PAR_C LLAVE_A instr_general LLAVE_C {$$=instruccionesAPI.nuevoMetodo($2,"vacio",$6); in_var("main", "main");}
    | error LLAVE_C{  in_err("Sintactico",this._$.first_line,this._$.first_column,yytext); }
;


instr_general
    : instr_general instr	{ $1.push($2); $$ = $1; }
    | instr                 { $$ = [$1]; }
;
//normal
instr
    : IF PAR_A asignacion PAR_C LLAVE_A instr_general LLAVE_C {$$=instruccionesAPI.nuevoIf($3,$6);}
    | ELSE IF PAR_A asignacion PAR_C LLAVE_A instr_general LLAVE_C {$$=instruccionesAPI.nuevoElseIf($4,$7);}
    | ELSE LLAVE_A instr_general LLAVE_C {$$=instruccionesAPI.nuevoElse($3);}
    | WHILE PAR_A asignacion PAR_C LLAVE_A instr_general LLAVE_C {$$=instruccionesAPI.nuevoWhile($3,$6);}
    | DO LLAVE_A instr_general LLAVE_C WHILE PAR_A asignacion PAR_C PUNTO_C {$$=instruccionesAPI.nuevoDoWhile($7,$3);}
    | SYSTEM PUNTO OUT PUNTO otro_print PAR_A asignacion PAR_C PUNTO_C  {$$=instruccionesAPI.nuevoPrint($5,$7);}
    | FOR PAR_A var_for PUNTO_C asignacion PUNTO_C asignacion_icr PAR_C LLAVE_A instr_general LLAVE_C {$$=instruccionesAPI.nuevoFor($3,$5,$7,$10);}
    | typo_var lista_v IGUAL asignacion PUNTO_C {$$=instruccionesAPI.nuevoVal($1,$2,$4); }
    | typo_var lista_v PUNTO_C {$$=instruccionesAPI.nuevoVal($1,$2,"");  }
    | BREAK PUNTO_C {$$=instruccionesAPI.nuevoBreak();}
    | RETURN asignacion_ret PUNTO_C {$$=instruccionesAPI.nuevoReturn($2);}
    | IDENTIFICADOR sms PUNTO_C {$$=instruccionesAPI.nuevaUnar($2,$1);}
    | IDENTIFICADOR PAR_A params2 PAR_C PUNTO_C  {$$=instruccionesAPI.nuevollamada($1,$3);}
    | IDENTIFICADOR IGUAL asignacion PUNTO_C    {$$=instruccionesAPI.nuevoAsig($1,$3);}
    | SWITCH PAR_A asignacion PAR_C LLAVE_A sw_op LLAVE_C {$$=instruccionesAPI.nuevoSwitch($3,$6);}
    | CONTINUE PUNTO_C {$$=instruccionesAPI.nuevoContinue();}
    | error PUNTO_C{  in_err("Sintactico",this._$.first_line,this._$.first_column,yytext); }
;


asignacion_ret
    :/*empty*/ {}
    |asignacion {$$=$1}
;

asignacion_icr
    : IDENTIFICADOR sms {$$=[$1,$2];}

;

sms
    : MAS MAS  {$$=TIPO_OPERACION.INCREMENTO;}
    | MENOS MENOS {$$=TIPO_OPERACION.DECREMENTO;}
;

lista_v
    :lista_v COMA IDENTIFICADOR {$1.push($3); in_var("Variable", $3); }
    | IDENTIFICADOR {$$=[$1]; in_var("Variable", $1);}
;

sw_op
    : sw_op casos {$1.push($2); $$=$1;}
    |casos {$$=[$1];}
;

casos
    : CASE asignacion DOS_P instr_general {$$=instruccionesAPI.nuevoCaso($2,$4);}
    | DEFAULT DOS_P instr_general {$$=instruccionesAPI.nuevoDefault($3);}
;
var_for
    : typo_var IDENTIFICADOR IGUAL asignacion {$$=[$2,$4];}
    | IDENTIFICADOR IGUAL asignacion {$$=[$1,$3]}
;

/*para los parametros de llama de funcion*/
params2
    : /*empty*/ {$$="";}
    | params2 COMA asignacion   {$1.push($3); $$=$1;}
    | asignacion {$$=[$1];}
;
/*para los valores en la de claracion de una finc*/
params
    : /*empty*/   {$$="";}
    | params COMA typo_var IDENTIFICADOR {$1.push($3+" -> "+$4); $$=$1;}
    | typo_var IDENTIFICADOR {$$=[$1+" -> "+$2];}
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
    : asignacion symb asignacion {$$=instruccionesAPI.nuevaOpr($1,$3,$2);}
    | valx  {$$=$1;}
;

valx
    : ENTERO    {$$=instruccionesAPI.nuevoValorAsg(TIPO_VAL.NUMERO,$1);}
    | DECIMAL   {$$=instruccionesAPI.nuevoValorAsg(TIPO_VAL.NUMERO,$1);}
    | IDENTIFICADOR {$$=instruccionesAPI.nuevoValorAsg(TIPO_VAL.IDENTIFICADOR,$1);}
    | IDENTIFICADOR PAR_A params2 PAR_C {$$=instruccionesAPI.nuevollamada($1,$3);}
    | TRUE {$$=instruccionesAPI.nuevoValorAsg(TIPO_VAL.IDENTIFICADOR,$1);}
    | FALSE {$$=instruccionesAPI.nuevoValorAsg(TIPO_VAL.IDENTIFICADOR,$1);}
    | CADENA {$$=instruccionesAPI.nuevoValorAsg(TIPO_VAL.CADENA,$1);}
    | PAR_A asignacion PAR_C {$$=instruccionesAPI.nuevoParentesis($2);}
    | unar_op   {$$=$1;}
;

unar_op
    :MENOS valx {$$=instruccionesAPI.nuevaUnar(TIPO_OPERACION.RESTA,$2);}
    |NOT valx   {$$=instruccionesAPI.nuevaUnar(TIPO_OPERACION.NOT,$2);}
;

symb
    : AND {$$=TIPO_OPERACION.AND;}
    | OR {$$=TIPO_OPERACION.OR;}
    | NO_IGUAL {$$=TIPO_OPERACION.NO_IGUAL;}
    | MAS {$$=TIPO_OPERACION.SUMA;}
    | MENOS {$$=TIPO_OPERACION.RESTA;}
    | POR {$$=TIPO_OPERACION.MULTIPLICACION;}
    | DIV {$$=TIPO_OPERACION.DIVISION;}
    | POW {$$=TIPO_OPERACION.POW;}
    | MAYOR {$$=TIPO_OPERACION.MAYOR_QUE;}
    | MENOR {$$=TIPO_OPERACION.MENOR_QUE;}
    | MAYOR_I {$$=TIPO_OPERACION.MAYOR_IGUAL;}
    | MENOR_I {$$=TIPO_OPERACION.MENOR_IGUAL;}
    | IGUAL_IGUAL {$$=TIPO_OPERACION.DOBLE_IGUAL;}
    | MOD {$$=TIPO_OPERACION.MODULO}
;