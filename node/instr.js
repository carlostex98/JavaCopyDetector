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
	DECREMENTO: 'O_DECREMENTO'
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

const instruccionesAPI = {
	nuevoImport: function (valor) {
		return {
			tipo: TIPO_INSTRUCCION.IMPORT,
			valor: valor
		}
	},

	nuevoClass: function (valor, instr) {
		return {
			tipo: TIPO_INSTRUCCION.CLASS,
			valor: valor,
			instrucciones: instr
		}
	},

	nuevoVal: function (tipo, nombre, valor) {
		return {
			tipo: tipo,
			nombre: nombre,
			valor: valor
		}
	},

	nuevoPrint: function (tipo, valores) {
		n = "";
		if (tipo == "print") {
			n = TIPO_INSTRUCCION.PRINT;
		} else {
			n = TIPO_INSTRUCCION.PRINTLN;
		}
		return {
			tipo: n,
			valores: valores
		}
	},

	nuevoWhile: function (exprLogica, instrucciones) {
		return {
			tipo: TIPO_INSTRUCCION.WHILE,
			expresion: exprLogica,
			instrucciones: instrucciones
		};
	},
	nuevoDoWhile: function (exprLogica, instrucciones) {
		return {
			tipo: TIPO_INSTRUCCION.DO_WHILE,
			expresion: exprLogica,
			instrucciones: instrucciones
		};
	},

	nuevoFor: function (var_arr, expresionLogica, aumento, instrucciones) {
		var a = var_arr[0];
		var b = var_arr[1];
		return {
			tipo: TIPO_INSTRUCCION.FOR,
			expresion: expresionLogica,
			aumento: aumento,
			variable: a,
			valorVariable: b,
			instrucciones: instrucciones
		}
	},

	nuevoIf: function (expresionLogica, instrucciones) {
		return {
			tipo: TIPO_INSTRUCCION.IF,
			expresion: expresionLogica,
			instrucciones: instrucciones
		}
	},
	nuevoElse: function (instrucciones) {
		return {
			tipo: TIPO_INSTRUCCION.ELSE,
			instrucciones: instrucciones
		}
	},

	nuevoElseIf: function (expresionLogica, instrx) {
		return {
			tipo: TIPO_INSTRUCCION.IF_ELSE,
			expresion: expresionLogica,
			intrucciones: instrx
		}
	},

	nuevoSwitch: function (varx, casos) {
		return {
			tipo: TIPO_INSTRUCCION.SWITCH,
			variable: varx,
			casos: casos
		}
	},

	nuevoCaso: function (valor, instr) {
		return {
			tipo: TIPO_INSTRUCCION.CASE,
			valor: valor,
			instrucciones: instr
		}
	},
	nuevoDefault: function (instr) {
		return {
			tipo: TIPO_INSTRUCCION.DEFAULT,
			instrucciones: instr
		}
	},

	nuevoMetodo: function (nombre, params, instrx) {
		return {
			tipo: TIPO_INSTRUCCION.METODO,
			nombre: nombre,
			parametros: params,
			instrucciones: instrx
		}
	},
	nuevoFuncion: function (nombre, params, tipo, intrx) {
		return {
			tipo: TIPO_INSTRUCCION.FUNCION,
			nombre: nombre,
			parametros: params,
			tipo: tipo,
			instrucciones: instrx
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
	nuevoValorAsg: function (tipo, valor) {
		return {
			tipo: tipo,
			valor: valor
		}
	},
	nuevoParentesis: function (val) {
		return {
			tipo: TIPO_INSTRUCCION.AGRUPACION,
			valor: val
		}
	},
	nuevaOpr: function (Izq, Der, tipo) {
		return {
			tipo: tipo,
			Izq: Izq,
			Der: Der,

		}
	},
	nuevaUnar: function (tipo, valor) {
		return {
			tipo: tipo,
			valor: valor
		}
	}

}

module.exports.TIPO_OPERACION = TIPO_OPERACION;
module.exports.TIPO_INSTRUCCION = TIPO_INSTRUCCION;
module.exports.TIPO_VAL = TIPO_VAL;
module.exports.instruccionesAPI = instruccionesAPI;