
var Juego = {

  instrucciones: ['mover con las flechas las piezas del rompecabezas', 'formar la imagen que se muestra en objetivo'],
  movimientos: [],
  movimientosTotales: 0,
  grilla: [],
  filaVacia: 5,
  columnaVacia: 5,
  cantidadDePiezasPorLado: Number(document.getElementById('cantidadPiezasPorLado').value),
  codigosDireccion: {
      IZQUIERDA: 37,
      ARRIBA: 38,
      DERECHA: 39,
      ABAJO: 40
  },

/*
  FUNCIONES NUEVAS
*/

iniciarImagen: function (callback) {
  this.imagen = new Image();
  var self = this;
  //se espera a que se termine de cargar la imagen antes de ejecutar la siguiente funcion
  this.imagen.addEventListener('load', function () {
    self.cargarImagen.call(self);
    callback();
  }, false);
  this.imagen.src = "images/imagen.jpg";
},

  crearGrilla: function(){

    this.canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');

  },

  cargarImagen: function (e) {
      //se calcula el ancho y el alto de las piezas de acuerdo al tamaño del canvas (600).
      this.anchoPiezas = Math.floor(600 / this.cantidadDePiezasPorLado);
      this.altoPiezas = Math.floor(600 / this.cantidadDePiezasPorLado);
      //se calcula el ancho y alto del rompecabezas de acuerdo al ancho y alto de cada pieza y la cantidad de piezas por lado
      this.anchoDeRompecabezas = this.anchoPiezas * this.cantidadDePiezasPorLado;
      this.altoDeRompecabezas = this.altoPiezas * this.cantidadDePiezasPorLado;
      this.configurarCanvas;
    },

    construirPiezas : function(){

      let z = 1;

      for (var i = 0; i < this.cantidadDePiezasPorLado; i++) {

        this.grilla.push([]);

        for (var j = 0; j < this.cantidadDePiezasPorLado; j++) {

          this.grilla[i].push(z);

          let x = j*(600/this.cantidadDePiezasPorLado) ;
          let y = i*(600/this.cantidadDePiezasPorLado);

          if (i == this.cantidadDePiezasPorLado - 1 && j == this.cantidadDePiezasPorLado - 1) {
            this.construirPiezaBlanca();
            this.piezas.push({ficha: z, xOriginal: x, yOriginal: y, xActual: x, yActual: y});
          }else{
            this.ctx.drawImage(this.imagen, x, y, this.anchoPiezas, this.altoPiezas, x, y, this.anchoPiezas, this.altoPiezas);
            this.piezas.push({ficha: z, xOriginal: x, yOriginal: y, xActual: x, yActual: y});
          }

          this.filaVacia = this.cantidadDePiezasPorLado - 1;
          this.columnaVacia = this.cantidadDePiezasPorLado - 1;

          ++z;

        }

      }

    },

    construirPiezaBlanca: function(){

      this.ctx.beginPath();
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(600/this.cantidadDePiezasPorLado * (this.cantidadDePiezasPorLado - 1),600/this.cantidadDePiezasPorLado * (this.cantidadDePiezasPorLado - 1), 600/this.cantidadDePiezasPorLado,600/this.cantidadDePiezasPorLado);
      this.ctx.stroke();

    },


  /*
  TERMINAN FUNCIONES NUEVAS
  */

  mostrarInstrucciones : function() {
      for (let i = 0; i < this.instrucciones.length; i++) {
        this.mostrarInstruccionEnLista(this.instrucciones[i], 'lista-instrucciones');
      }
  },

  agregarMovimiento : function(direccion){
    this.movimientos.push(direccion);
    this.actualizarUltimoMovimiento(direccion);
  },

  chequearSiGano : function() {

      var grillaAVerificar = [];
      var grillaGanadora = [];

      for (var i = 0; i < this.cantidadDePiezasPorLado*this.cantidadDePiezasPorLado; i++) {
        grillaGanadora.push(i+1);
      };

      console.log(grillaGanadora);

      for (let i = 0; i < grilla.length; i++) {

        for (let j = 0; j < grilla.length; j++) {

          grillaAVerificar.push(grilla[i][j]);

        }

      }


      for (let i = 0; i < grillaGanadora.length; i++) {

        if (grillaGanadora[i] != grillaAVerificar[i]) {
          return false;
        }

      }

      return true;
  },

  mostrarCartelGanador: function() {
      return alert('GANASTE EL JUEGO');
  },

  intercambiarPosicionesGrilla: function(filaPos1, columnaPos1, filaPos2, columnaPos2) {
      var pieza1 = this.grilla[filaPos1][columnaPos1];
      var pieza2 = this.grilla[filaPos2][columnaPos2];

      var pieza1Anterior = pieza1;

      this.grilla[filaPos1][columnaPos1] = pieza2;
      this.grilla[filaPos2][columnaPos2] = pieza1Anterior;

  },

  actualizarPosicionVacia : function(nuevaFila, nuevaColumna) {
      this.filaVacia = nuevaFila;
      this.columnaVacia = nuevaColumna;
  },

  posicionValida : function(fila, columna) {
      return ((fila >= 0 && fila <=2) && (columna >= 0 && columna <= 2));
  },

  moverEnDireccion : function(direccion) {
    this.nuevaFilaPiezaVacia;
    this.nuevaColumnaPiezaVacia;

    // Mueve pieza hacia la abajo, reemplazandola con la blanca
    if (direccion === this.codigosDireccion.ABAJO) {
      this.nuevaFilaPiezaVacia = this.filaVacia - 1;
      this.nuevaColumnaPiezaVacia = this.columnaVacia;
    }

    // Mueve pieza hacia arriba, reemplazandola con la blanca
    else if (direccion === this.codigosDireccion.ARRIBA) {
      this.nuevaFilaPiezaVacia = this.filaVacia + 1;
      this.nuevaColumnaPiezaVacia = this.columnaVacia;
    }

    // Mueve pieza hacia la derecha, reemplazandola con la blanca
    else if (direccion === this.codigosDireccion.DERECHA) {
      //COMPLETAR
      this.nuevaFilaPiezaVacia = this.filaVacia;
      this.nuevaColumnaPiezaVacia = this.columnaVacia - 1;
    }

    // Mueve pieza hacia la izquierda, reemplazandola con la blanca
    else if (direccion === this.codigosDireccion.IZQUIERDA) {
      // COMPLETAR
      this.nuevaFilaPiezaVacia = this.filaVacia;
      this.nuevaColumnaPiezaVacia = this.columnaVacia + 1;
    }

    /* A continuación se chequea si la nueva posición es válida, si lo es, se intercambia.
    Para que esta parte del código funcione correctamente deberás haber implementado
    las funciones posicionValida, intercambiarPosicionesGrilla y actualizarPosicionVacia */

      if (this.posicionValida(this.nuevaFilaPiezaVacia, this.nuevaColumnaPiezaVacia)) {
          this.intercambiarPosiciones(this.filaVacia, this.columnaVacia, this.nuevaFilaPiezaVacia, this.nuevaColumnaPiezaVacia);
          this.actualizarPosicionVacia(this.nuevaFilaPiezaVacia, this.nuevaColumnaPiezaVacia);
    //
    //
    // //COMPLETAR: Agregar la dirección del movimiento al arreglo de movimientos
        this.agregarMovimiento(direccion);
    //
      }
  },

  restringirCantidadMovimientos : function(){

    if (movimientosTotales == 59) {

      if(chequearSiGano()){
        mostrarCartelGanador();
        location.reload();
      }else{
        alert('Se terminaron los intentos!');
      location.reload();
      }

    }else{
      var pMovimientosRestante = document.querySelector('#movimientos-restantes p');
      movimientosTotales++;
      pMovimientosRestante.innerHTML = 60 - movimientosTotales;
    }

  },

  intercambiarPosiciones : function(fila1, columna1, fila2, columna2) {
    // Intercambio posiciones en la grilla
    var pieza1 = this.grilla[fila1][columna1];
    var pieza2 = this.grilla[fila2][columna2];

    this.intercambiarPosicionesGrilla(fila1, columna1, fila2, columna2);
    // this.intercambiarPosicionesDOM('pieza' + pieza1, 'pieza' + pieza2);

  },

  // intercambiarPosicionesDOM : function(idPieza1, idPieza2) {
  //   // Intercambio posiciones en el DOM
  //   var elementoPieza1 = document.getElementById(idPieza1);
  //   var elementoPieza2 = document.getElementById(idPieza2);
  //
  //   var padre = elementoPieza1.parentNode;
  //
  //   var clonElemento1 = elementoPieza1.cloneNode(true);
  //   var clonElemento2 = elementoPieza2.cloneNode(true);
  //
  //   padre.replaceChild(clonElemento1, elementoPieza2);
  //   padre.replaceChild(clonElemento2, elementoPieza1);
  //
  // },

  actualizarUltimoMovimiento : function(direccion) {
    ultimoMov = document.getElementById('flecha');
    switch (direccion) {
      case this.codigosDireccion.ARRIBA:
        ultimoMov.textContent = '↑';
        break;
      case this.codigosDireccion.ABAJO:
        ultimoMov.textContent = '↓';
        break;
      case this.codigosDireccion.DERECHA:
        ultimoMov.textContent = '→';
        break;
      case this.codigosDireccion.IZQUIERDA:
        ultimoMov.textContent = '←';
        break;
    }
  },

  mostrarInstruccionEnLista : function(instruccion, idLista) {
    var ul = document.getElementById(idLista);
    var li = document.createElement("li");
    li.textContent = instruccion;
    ul.appendChild(li);
  },

  mezclarPiezas : function(veces) {
    if (veces <= 0) {
      return;
    }

    var direcciones = [this.codigosDireccion.ABAJO, this.codigosDireccion.ARRIBA,
        this.codigosDireccion.DERECHA, this.codigosDireccion.IZQUIERDA
      ];

    var direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
    this.moverEnDireccion(direccion);

    var _this = this;

    setTimeout(function() {
        _this.mezclarPiezas(veces - 1);
      }, 100);

  },

  capturarTeclas : function() {
    document.body.onkeydown = (function(evento) {
      if (evento.which === codigosDireccion.ABAJO ||
        evento.which === codigosDireccion.ARRIBA ||
        evento.which === codigosDireccion.DERECHA ||
        evento.which === codigosDireccion.IZQUIERDA) {

        var filaVaciaGuardada = filaVacia;
        var columnaVaciaGuardada = columnaVacia;

        moverEnDireccion(evento.which);

        if(filaVacia != filaVaciaGuardada || columnaVacia != columnaVaciaGuardada){
          restringirCantidadMovimientos();
          console.log(movimientosTotales);
        }

        var _this = this;

          var gano = chequearSiGano();
          if (gano) {
            setTimeout(function() {
                _this.mostrarCartelGanador();
                }, 500);
              }
              evento.preventDefault();
          }
      })
  },

  iniciar: function (cantMovimientos) {
    this.movimientosTotales = cantMovimientos;
    this.contadorDeMovimientos = cantMovimientos;
    this.piezas = [];
    this.grilla = [];
    document.getElementById("contadorDeMovimientos").innerHTML = this.contadorDeMovimientos;
    //se guarda el contexto en una variable para que no se pierda cuando se ejecute la funcion iniciarImagen (que va a tener otro contexto interno)
    var self = this;
    this.crearGrilla();
    //se instancian los atributos que indican la posicion de las fila y columna vacias de acuerdo a la cantidad de piezas por lado para que sea la ultima del tablero
    this.filaPosicionVacia = this.cantidadDePiezasPorLado - 1;
    this.columnaPosicionVacia = this.cantidadDePiezasPorLado - 1;
    //se espera a que este iniciada la imagen antes de construir las piezas y empezar a mezclarlas
    this.iniciarImagen(function () {
      self.construirPiezas();
      //la cantidad de veces que se mezcla es en funcion a la cantidad de piezas por lado que tenemos, para que sea lo mas razonable posible.
      var cantidadDeMezclas = Math.max(Math.pow(self.cantidadDePiezasPorLado, 3), 100);
      self.mezclarPiezas(cantidadDeMezclas);
    });
  }

}


Juego.iniciar(100);
