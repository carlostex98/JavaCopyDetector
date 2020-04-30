/* Definición Léxica */
%lex

%options case-insensitive

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
"+"                return 'MAS';
"-"                return 'MENOS';
"*"                return 'POR';
"/"                return 'DIV';
"^"                return 'POW';
