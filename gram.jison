/* Definición Léxica */
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
"false"                 return 'FALSE;
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
.					    { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }

/lex

