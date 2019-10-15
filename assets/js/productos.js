var vueApp= new Vue({
    el:"#vueApp",
    data:{
        alerta:{
          titulo: "Error",
          mensaje:"Texto"
      },
        categorias:[],
        productos:[],
        nuevoProducto:{
    "idProducto": 0,
    "idCategoria": 1,
    "nombreProducto": "",
    "precio": 0,
    "esPreparado": 0
    },
        
    },
    mounted: function(){
        this.cargarDatos();
    },
    methods:{
        mostrarAlerta:function(titu,msg){
            this.alerta.titulo=titu;
            this.alerta.mensaje=msg;
           
            $("#miAlerta").show('fade');
            setTimeout(function(){
                $("#miAlerta").hide('fade');
            },5000);
            
        },
        cerrarAlerta:function(){
            $('#miAlerta').hide('fade');
        },
        //consume la API con axios
        cargarDatos: function(){
            //Carga categorias
            axios.get('http://localhost:3000/api/Categoria')
                    .then(function (response) {
                        console.log(response.data);
                        vueApp.categorias=response.data;
                      })
                .catch(function (error){
                vueApp.mostrarAlerta("Error en API",error);
            });
            
            //Carga productos
            axios.get('http://localhost:3000/api/Productos')
                    .then(function (response) {
                        console.log(response.data);
                        vueApp.productos=response.data;
                      })
                .catch(function (error){
                vueApp.mostrarAlerta("Error en API",error);
            });
        },
        
        //Agrega el nuevo producto enviandolo a la API
        agregarProducto: function(){
             axios.post('http://localhost:3000/api/Productos',this.nuevoProducto)
                .then(function (response){
                vueApp.mostrarAlerta('Exito','Se agrego el producto correctamente');
                vueApp.cargarDatos();
                vueApp.nuevoProducto={
                "idProducto": 0,
                "idCategoria": 1,
                "nombreProducto": "",
                "precio": 0,
                "esPreparado": 0
                }
            })
            .catch(function (error){
                vueApp.mostrarAlerta('Error', error);
            });
        },
  
    },
});