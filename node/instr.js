const TIPO_VAL = {
	NUMERO: 'V_NUMERO',
	IDENTIFICADOR: 'V_IDENTIFICADOR',
	CADENA: 'V_CADENA',
};

const TIPO_OPERACION = {
	SUMA: 'O_SUMA',
	RESTA: 'O_RESTA',
	MULTIPLICACION: 'O_MULTIPLICACION',
	DIVISION: 'O_DIVISION',
	NEGATIVO: 'O_NEGATIVO',
	MAYOR_QUE: 'O_MAYOR_QUE',
	MENOR_QUE: 'O_MENOR_QUE',
	MAYOR_IGUAL: 'O_MAYOR_IGUAL',
	MENOR_IGUAL: 'O_MENOR_IGUAL',
	DOBLE_IGUAL: 'O_DOBLE_IGUAL',
	NO_IGUAL: 'O_NO_IGUAL',
	AND: 'O_AND',
	OR: 'O_OR',
	NOT: 'O_NOT',
	POW: 'O_POW',
	CONCATENACION: 'O_CONCATENACION',
	INCREMENTO: 'O_INCREMENTO',
	DECREMENTO: 'O_DECREMENTO',
	MODULO: '0_MOD'
};

const TIPO_INSTRUCCION = {
	PRINT: 'INSTR_PRINT',
	PRINTLN: 'INSTR_PRINTLN',
	WHILE: 'INSTR_WHILE',
	DECLARACION: 'INSTR_DECLARACION',
	ASIGNACION: 'INSTR_ASIGANCION',
	IF: 'INSTR_IF',
	IF_ELSE: 'INSTR_IFELSE',
	ELSE: 'INSTR_ELSE',
	FOR: 'INST_FOR',
	DO_WHILE: 'INSTR_DOWHILE',
	SWITCH: 'SWITCH',
	SWITCH_OP: 'SWITCH_OP',
	SWITCH_DEF: 'SWITCH_DEF',
	ASIGNACION_SIMPLIFICADA: 'ASIGNACION_SIMPLIFICADA',
	IMPORT: 'IMPORT',
	CLASS: 'CLASS',
	MAIN: 'MAIN',
	FUNCION: 'FUNCION',
	METODO: 'METODO',
	CONTINUE: 'CONTINUE',
	BREAK: 'BREAK',
	RETURN: 'RETURN',
	LLAMADA_F: "LLAMADA_F",
	AGRUPACION: "AGRUPACION",
	CASE: 'CASE',
	DEFAULT: 'DEFAULT'
};

//estaba diseñado para devolver un json, pero lo arregle para que 
// devuelva un arbol en html
const instruccionesAPI = {
	nuevoImport: function (valor) {//ok
		var n = "<li> IMPORT - " + valor + "</li>"
		return n;
	},

	nuevoClass: function (valor, instr) {//ok
		var poser = "<li><span class='caret'> CLASS </span>";
		poser+="<ul class='nested'>";
		poser+="<li>Nombre:"+valor+"</li>";//ahora las instrucciones
		poser+="<li><span class='caret'>Instrucciones</span>";
		poser+="<ul class='nested'>";
		poser+=instr;
		poser+="</ul>";
		poser+="</li>";
		poser+="</ul>";
		poser+="</li>"
		return poser;
	},

	nuevoVal: function (tipo, nombre, valor) {
		var p="<li><span class='caret'>Variable</span>";
		p+="<ul class='nested'>";
		p+="<li>Tipo:"+tipo+"</li>";
		p+="<li>Nombre:"+nombre+"</li>";

		p+="<li><span class='caret'>Valor</span>";
		p+="<ul class='nested'>";
		p+=valor;
		p+="</ul>";
		p+="</li>";

		
		p+="</ul>";
		p+="</li>";

		return p;
	},

	nuevoPrint: function (tipo, valores) {
		n = "";
		if (tipo == "print") {
			n = TIPO_INSTRUCCION.PRINT;
		} else {
			n = TIPO_INSTRUCCION.PRINTLN;
		}
		var p="<li><span class='caret'>PRINT</span>";
		p+="<ul class='nested'>";
		

		p+="<li><span class='caret'>Valor</span>";
		p+="<ul class='nested'>";
		p+=valores;
		p+="</ul>";
		p+="</li>";

		
		p+="</ul>";
		p+="</li>";

		return p;
	},

	nuevoWhile: function (exprLogica, instrucciones) {
		var p="<li><span class='caret'> WHILE </span>";
		p+="<ul class='nested'>";
		

		p+="<li><span class='caret'>Valor-logico</span>";
		p+="<ul class='nested'>";
		p+=exprLogica;
		p+="</ul>";
		p+="</li>";

		p+="<li><span class='caret'>Instrucciones</span>";
		p+="<ul class='nested'>";
		p+=instrucciones;
		p+="</ul>";
		p+="</li>";
		
		p+="</ul>";
		p+="</li>";

		return p;

	},
	nuevoDoWhile: function (exprLogica, instrucciones) {
		var p="<li><span class='caret'> DO-WHILE </span>";
		p+="<ul class='nested'>";
		

		p+="<li><span class='caret'>Valor-logico</span>";
		p+="<ul class='nested'>";
		p+=exprLogica;
		p+="</ul>";
		p+="</li>";

		p+="<li><span class='caret'>Instrucciones</span>";
		p+="<ul class='nested'>";
		p+=instrucciones;
		p+="</ul>";
		p+="</li>";
		
		p+="</ul>";
		p+="</li>";

		return p;
	},

	nuevoFor: function (var_arr, expresionLogica, aumento, instrucciones) {

		var a = var_arr[0];
		var b = var_arr[1];

		var p="<li><span class='caret'> FOR </span>";
		p+="<ul class='nested'>";

		p+="<li>Variable: "+a+"</li>"

		p+="<li><span class='caret'>Valor-variable</span>";
		p+="<ul class='nested'>";
		p+=exprLogica;
		p+="</ul>";
		p+="</li>";

		p+="<li><span class='caret'>Valor-logico</span>";
		p+="<ul class='nested'>";
		p+=b;
		p+="</ul>";
		p+="</li>";

		p+="<li><span class='caret'>Aumento</span>";
		p+="<ul class='nested'>";
		p+=aumento;
		p+="</ul>";
		p+="</li>";

		p+="<li><span class='caret'>Instrucciones</span>";
		p+="<ul class='nested'>";
		p+=instrucciones;
		p+="</ul>";
		p+="</li>";
		
		p+="</ul>";
		p+="</li>";

		return p;
	},

	nuevoIf: function (expresionLogica, instrucciones) {

		var p="<li><span class='caret'> IF </span>";
		p+="<ul class='nested'>";
		

		p+="<li><span class='caret'>Valor-logico</span>";
		p+="<ul class='nested'>";
		p+=expresionLogica;
		p+="</ul>";
		p+="</li>";

		p+="<li><span class='caret'>Instrucciones</span>";
		p+="<ul class='nested'>";
		p+=instrucciones;
		p+="</ul>";
		p+="</li>";
		
		p+="</ul>";
		p+="</li>";

		return p;

	},
	nuevoElse: function (instrucciones) {
		var p="<li><span class='caret'> ELSE </span>";
		p+="<ul class='nested'>";
		

		p+="<li><span class='caret'>Instrucciones</span>";
		p+="<ul class='nested'>";
		p+=instrucciones;
		p+="</ul>";
		p+="</li>";
		
		p+="</ul>";
		p+="</li>";

		return p;
	},

	nuevoElseIf: function (expresionLogica, instrx) {
		var p="<li><span class='caret'> ELSE-IF </span>";
		p+="<ul class='nested'>";
		

		p+="<li><span class='caret'>Valor-logico</span>";
		p+="<ul class='nested'>";
		p+=expresionLogica;
		p+="</ul>";
		p+="</li>";

		p+="<li><span class='caret'>Instrucciones</span>";
		p+="<ul class='nested'>";
		p+=instrx;
		p+="</ul>";
		p+="</li>";
		
		p+="</ul>";
		p+="</li>";

		return p;
	},

	nuevoSwitch: function (varx, casos) {

		var p="<li><span class='caret'> SWITCH </span>";
		p+="<ul class='nested'>";
		

		p+="<li><span class='caret'>Valor</span>";
		p+="<ul class='nested'>";
		p+=varx;
		p+="</ul>";
		p+="</li>";

		p+="<li><span class='caret'>Casos</span>";
		p+="<ul class='nested'>";
		p+=casos;
		p+="</ul>";
		p+="</li>";
		
		p+="</ul>";
		p+="</li>";

		return p;
	},

	nuevoCaso: function (valor, instr) {

		var p="<li><span class='caret'> CASO </span>";
		p+="<ul class='nested'>";
		

		p+="<li><span class='caret'>Valor</span>";
		p+="<ul class='nested'>";
		p+=valor;
		p+="</ul>";
		p+="</li>";

		p+="<li><span class='caret'>Instrucciones</span>";
		p+="<ul class='nested'>";
		p+=instr;
		p+="</ul>";
		p+="</li>";
		
		p+="</ul>";
		p+="</li>";

		return p;

	},
	nuevoDefault: function (instr) {
		var p="<li><span class='caret'> DEFAULT </span>";
		p+="<ul class='nested'>";
		

		p+="<li><span class='caret'>Instrucciones</span>";
		p+="<ul class='nested'>";
		p+=instr;
		p+="</ul>";
		p+="</li>";
		
		p+="</ul>";
		p+="</li>";

		return p;
	},

	nuevoMetodo: function (nombre, params, instrx) {

		var p="<li><span class='caret'> METODO </span>";
		p+="<ul class='nested'>";

		p+="<li>Nombre: "+nombre+"</li>"

		p+="<li><span class='caret'>Parametros</span>";
		p+="<ul class='nested'>";
		p+=params; //lista ver
		p+="</ul>";
		p+="</li>";

		p+="<li><span class='caret'>Instrucciones</span>";
		p+="<ul class='nested'>";
		p+=instrx;
		p+="</ul>";
		p+="</li>";
		
		p+="</ul>";
		p+="</li>";

		return p;

	},
	nuevoFuncion: function (nombre, params, tipo, instrx) {
		var p="<li><span class='caret'> FUNCION </span>";
		p+="<ul class='nested'>";

		p+="<li>Nombre: "+nombre+"</li>"
		p+="<li>Tipo: "+tipo+"</li>"

		p+="<li><span class='caret'>Parametros</span>";
		p+="<ul class='nested'>";
		p+=params; //lista ver
		p+="</ul>";
		p+="</li>";

		p+="<li><span class='caret'>Instrucciones</span>";
		p+="<ul class='nested'>";
		p+=instrx;
		p+="</ul>";
		p+="</li>";
		
		p+="</ul>";
		p+="</li>";

		return p;
	},
	nuevollamada: function (nombre, params) {
		
		var p="<li><span class='caret'> LLAMADA-FUNCION </span>";
		p+="<ul class='nested'>";

		p+="<li>Nombre: "+nombre+"</li>"

		p+="<li><span class='caret'>Parametros</span>";
		p+="<ul class='nested'>";
		p+=params; //VER QUE PASA
		p+="</ul>";
		p+="</li>";
		
		p+="</ul>";
		p+="</li>";

		return p;

	},
	nuevoAsig: function (nombre, valores) {
		var p="<li><span class='caret'> Asignacion </span>";
		p+="<ul class='nested'>";

		p+="<li>Nombre: "+nombre+"</li>"

		p+="<li><span class='caret'>Valores</span>";
		p+="<ul class='nested'>";
		p+=valores;
		p+="</ul>";
		p+="</li>";
		
		p+="</ul>";
		p+="</li>";

		return p;
	},
	nuevoBreak: function () {
		//no recibe parametros
		var n = "<li> BREAK </li>"
		return n;
		
	},
	nuevoContinue: function () {
		//no recibe parametros
		var n = "<li> CONTINUE </li>"
		return n;
	},
	nuevoReturn: function (valores) {
		var p="<li><span class='caret'> RETURN </span>";
		p+="<ul class='nested'>";

		p+="<li><span class='caret'>Valores</span>";
		p+="<ul class='nested'>";
		p+=valores;
		p+="</ul>";
		p+="</li>";
		
		p+="</ul>";
		p+="</li>";

		return p;
	},
	nuevoValorAsg: function (tipo, valor) {//ultima derivacion
		var p="<li><span class='caret'> "+tipo+" </span>";
		p+="<ul class='nested'>";
		p+="<li>"+valor+"</li>"
		p+="</ul>";
		p+="</li>";

		return p;
	},
	nuevoParentesis: function (val) {

		var p="<li><span class='caret'> AGRUPACION </span>";
		p+="<ul class='nested'>";

		p+="<li><span class='caret'>Valores</span>";
		p+="<ul class='nested'>";
		p+=val;
		p+="</ul>";
		p+="</li>";
		
		p+="</ul>";
		p+="</li>";
	},
	nuevaOpr: function (Izq, Der, tipo) {

		var p="<li><span class='caret'> OPERACION </span>";
		p+="<ul class='nested'>";
		p+="<li>"+tipo+"</li>"
		p+="<li><span class='caret'>Valore-izq</span>";
		p+="<ul class='nested'>";
		p+=Izq;
		p+="</ul>";
		p+="</li>";


		p+="<li><span class='caret'>Valore-der</span>";
		p+="<ul class='nested'>";
		p+=Der;
		p+="</ul>";
		p+="</li>";
		
		p+="</ul>";
		p+="</li>";

		return p;
	},
	nuevaUnar: function (tipo, valor) {
		var p="<li><span class='caret'> OPERACION Unaria</span>";
		p+="<ul class='nested'>";
		p+="<li>"+tipo+"</li>"
	
		p+="<li><span class='caret'>Valor</span>";
		p+="<ul class='nested'>";
		p+=valor;
		p+="</ul>";
		p+="</li>";
		
		p+="</ul>";
		p+="</li>";

		return p;
	}

}

module.exports.TIPO_OPERACION = TIPO_OPERACION;
module.exports.TIPO_INSTRUCCION = TIPO_INSTRUCCION;
module.exports.TIPO_VAL = TIPO_VAL;
module.exports.instruccionesAPI = instruccionesAPI;