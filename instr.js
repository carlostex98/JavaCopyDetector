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
	CONCATENACION: 'O_CONCATENACION'
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
	CONTINUE: 'CONTINUE',
	BREAK: 'BREAK',
	RETURN: 'RETURN',
	LLAMADA_F: "LLAMADA_F",
	AGRUPACION: "AGRUPACION",
	CASE : 'CASE',
	DEFAULT: 'DEFAULT'
};

const instruccionesAPI = {


	nuevoImport: function (valor) {
		return {
			tipo: TIPO_INSTRUCCION.IMPORT,
			valor: valor
		}
	},

	nuevoClass: function (valor) {
		return {
			tipo: TIPO_INSTRUCCION.CLASS,
			valor: valor
		}
	},

	nuevoVal: function (tipo, nombre, valor) {
		return {
			tipo: tipo,
			nombre: nombre,
			valor: valor
		}
	},

	nuevoPrint: function (expresionCadena, tipo) {
		n = "";
		if (tipo == "print") {
			n = TIPO_INSTRUCCION.PRINT;
		} else {
			n = TIPO_INSTRUCCION.PRINTLN;
		}
		return {
			tipo: n,
			expresionCadena: expresionCadena
		}
	},

	nuevoWhile: function (exprLogica, instrucciones) {
		return {
			tipo: TIPO_INSTRUCCION.WHILE,
			expresionLogica: exprLogica,
			instrucciones: instrucciones
		};
	},
	nuevoDoWhile: function (exprLogica, instrucciones) {
		return {
			tipo: TIPO_INSTRUCCION.DO_WHILE,
			expresionLogica: exprLogica,
			instrucciones: instrucciones
		};
	},

	nuevoFor: function (var_arr, expresionLogica, aumento, instrucciones) {
		var a = var_arr[0];
		var b = var_arr[1];
		return {
			tipo: TIPO_INSTRUCCION.FOR,
			expresionLogica: expresionLogica,
			instrucciones: instrucciones,
			aumento: aumento,
			variable: a,
			valorVariable: b
		}
	},

	nuevoDeclaracion: function (identificador, tipo) {
		return {
			tipo: TIPO_INSTRUCCION.DECLARACION,
			identificador: identificador,
			tipo_dato: tipo
		}
	},
	//pendiente
	nuevoAsignacion: function (identificador, expresionNumerica) {
		return {
			tipo: TIPO_INSTRUCCION.ASIGNACION,
			identificador: identificador,
			expresionNumerica: expresionNumerica
		}
	},

	nuevoIf: function (expresionLogica, instrucciones) {
		return {
			tipo: TIPO_INSTRUCCION.IF,
			expresionLogica: expresionLogica,
			instrucciones: instrucciones
		}
	},
	nuevoElse: function (instrucciones) {
		return {
			tipo: TIPO_INSTRUCCION.ELSE,
			instrucciones: instrucciones
		}
	},

	nuevoElseIf: function (expresionLogica, instruccionesIfVerdadero, instruccionesIfFalso) {
		return {
			tipo: TIPO_INSTRUCCION.IF_ELSE,
			expresionLogica: expresionLogica,
			instruccionesIfVerdadero: instruccionesIfVerdadero,
			instruccionesIfFalso: instruccionesIfFalso
		}
	},

	nuevoSwitch: function (varx, casos) {
		return {
			tipo: TIPO_INSTRUCCION.SWITCH,
			variable: varx,
			casos: casos
		}
	},

	nuevoCaso:function(valor, instr){
		return{
			tipo: TIPO_INSTRUCCION.CASE,
			valor: valor,
			instrucciones: instr
		}
	},
	nuevoDefault:function(instr){
		return{
			tipo:TIPO_INSTRUCCION.DEFAULT,
			instrucciones: instr
		}
	},

	nuevoOperador: function (operador) {
		return operador
	},
	aignacionSimplificada: function (identificador, operador, expresionNumerica) {
		return {
			tipo: TIPO_INSTRUCCION.ASIGNACION_SIMPLIFICADA,
			operador: operador,
			expresionNumerica: expresionNumerica,
			identificador: identificador
		}
	},
	nuevoMetodo: function (nombre, params) {
		return {
			nombre: nombre,
			parametros: params
		}
	},
	nuevoFuncion: function (nombre, params, tipo) {
		return {
			nombre: nombre,
			parametros: params,
			tipo: tipo
		}
	},
	nuevollamada: function (nombre, params) {
		return {
			tipo: TIPO_INSTRUCCION.LLAMADA_F,
			nombre: nombre,
			parametros: params
		}
	},
	nuevoAsig: function (nombre, valores) {
		return {
			tipo: TIPO_INSTRUCCION.ASIGNACION,
			nombre: nombre,
			valores: valores
		}
	},
	nuevoBreak: function () {
		//no recibe parametros
		return {
			tipo: TIPO_INSTRUCCION.BREAK
		}
	},
	nuevoContinue: function () {
		//no recibe parametros
		return {
			tipo: TIPO_INSTRUCCION.CONTINUE
		}
	},
	nuevoReturn: function (valores) {
		return {
			tipo: TIPO_INSTRUCCION.RETURN,
			valores: valores
		}
	},
	nuevoValorAsg: function(tipo, valor){
		return{
			tipo: tipo,
			valor: valor
		}
	},
	nuevoParentesis: function(val){
		return{
			tipo:TIPO_INSTRUCCION.AGRUPACION,
			valor:val
		}
	},
	nuevaOpr: function (Izq, Der, tipo) {
		return {
			tipo: tipo,
			Izq: Izq,
			Der: Der,
			
		}
	},
	nuevaUnar: function(tipo, valor){
		return{
			tipo: tipo,
			valor: valor
		}
	}

}

module.exports.TIPO_OPERACION = TIPO_OPERACION;
module.exports.TIPO_INSTRUCCION = TIPO_INSTRUCCION;
module.exports.TIPO_VALOR = TIPO_VALOR;
module.exports.instruccionesAPI = instruccionesAPI;