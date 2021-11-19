


   

async function mostrarPantalla(){
 

    /******INICIO CONSUMO DE APIS******/

    let API_BOOKINGS =  await axios.get('https://api-challenge.blockinar.io/bookings');
    let bookings = API_BOOKINGS.data;

    let API_ROOMS =  await axios.get('https://api-challenge.blockinar.io/rooms'); 
    let rooms = API_ROOMS.data   
    
    let API_RESERVAS =  await axios.get('https://api-challenge.blockinar.io/bookings?check_in=2021-10-2415:00:00'); 
    let reservas = API_RESERVAS;
    
    

    //console.log (reservas.data);
    //console.log (bookings);
    //console.log (rooms);

        /******FIN CONSUMO DE APIS******/


    /***INICIO MOSTRAR EN TABLA 2***/
        let contenido = document.querySelector('#contenido_rooms');
        
    
        contenido.innerHTML=''
        
        for (let room of rooms){
            
            
            contenido.innerHTML += `
            <tr>
            <th  class="align-middle cell" scope="row">${room.id}</th>
            <td  class="align-middle cell">${room.category}</td>
            <td class="align-middle cell">${room.max_occupancy}</td>
            <td class="align-middle cell">${room.occupancy}</td>
            
            </tr>`
        }
            
    /***FIN MOSTRAR EN TABLA 2***/

    
    

    
    
    
    /***INICIO MOSTRAR EN TABLA 3***/
    let contenidoFechas = document.querySelector('#contenidoFechas');
    
    
    contenidoFechas.innerHTML=''
    
    for (let fechas of reservas.data){
        
        
        contenidoFechas.innerHTML += `
        <tr>
        <td class="align-middle cell">${fechas.id}</td>
        <td class="align-middle cell">${fechas.first_name}</td>
        <td class="align-middle cell">${fechas.last_name}</td>
        <th  class="align-middle cell" scope="row">${fechas.booking_status}</th>
        <td  class="align-middle cell">${fechas.check_in_date}</td>
        <td class="align-middle cell">${fechas.check_out_date}</td>
        <td class="align-middle cell">${fechas.number_of_guests}</td>
        <td class="align-middle cell">${fechas.price_per_night}</td>
        <td class="align-middle cell">${fechas.room_id ? fechas.room_id :'Sin asignar'}</td>
            </tr>`
        }
        
        // /***FIN MOSTRAR EN TABLA 3***/
   
   
   
       



        /****INICIO MOSTRANDO TABLA 3 DE CLIENTES*****/    
                
        let clientes = document.querySelector('#contenido');

        clientes.innerHTML=''

        for (let valor of bookings){
                
        clientes.innerHTML += `
        <tr>
        <th  class="align-middle" scope="row">${valor.id}</th>
        <td  class="align-middle">${valor.first_name}</td>
        <td class="align-middle">${valor.last_name}</td>
        <td class="align-middle">${valor.booking_status}</td>
        <td class="align-middle">${valor.check_in_date}</td>
        <td class="align-middle">${valor.check_out_date}</td>
        <td class="align-botton">${valor.number_of_guests}</td>
        <td class="align-middle">${valor.price_per_night}</td>
        <td class="align-middle">${valor.room_id ? valor.room_id :'Sin asignar'}</td>
        
        </tr>`
    }
    
    /****FIN MOSTRANDO TABLA 3 DE CLIENTES*****/    


     
    /****INICIO ORDENANDO CLIENTES****/
    let ordenarTabla = document.getElementById('ordenar');

    ordenarTabla.addEventListener('click',()=>{


        // alert("Boton de ordenamiento")
        let tablaOrdenada = bookings.sort(function (a, b) {
             a.first_name.toLowerCase();
            if (a.first_name > b.first_name) {
             return 1;
            }
            if (a.first_name < b.first_name) {
             return -1;
            }
             return 0;
        });
        
    
    clientes.innerHTML='';
        for (let valor of tablaOrdenada){
            clientes.innerHTML+= `
            <tr class ="cell cell-filter">
            <th  class="align-middle" scope="row">${valor.id}</th>
            <td  class="align-middle">${valor.first_name}</td>
            <td class="align-middle">${valor.last_name}</td>
            <td class="align-middle">${valor.booking_status}</td>
            <td class="align-middle">${valor.check_in_date}</td>
            <td class="align-middle">${valor.check_out_date}</td>
            <td class="align-botton">${valor.number_of_guests}</td>
            <td class="align-middle">${valor.price_per_night}</td>
            <td class="align-middle">${valor.room_id ? valor.room_id :'Sin asignar'}</td>
            
            </tr>`
        }
    
       
    });

    /****FIN ORDENANDO CLIENTES****/



//     /****INICIO FILTRO******/
   
//    const INPUT_FILTRO = document.getElementById('filtroCategoria tbody');

//    INPUT_FILTRO.addEventListener('keyup',filtrar);
    
   
//    function filtrar (){
       
//        let filtro = INPUT_FILTRO.value;
//        contenido.innerHTML= '';
       
//        for (let i= 0; i < rooms.lenght; i++ ){
           
//            if (rooms[i]['category'].toLowerCase().includes(filtro.toLowerCase())){

//             let fila = contenido.inserRow();

//             let celda1 =fila.insertCell();
//             let celda2 =fila.insertCell();
//             let celda3 =fila.insertCell();
//             let celda4 =fila.insertCell();

//             celda1.innerHTML = rooms[i]['id'];
//             celda2.innerHTML = rooms[i]['category'];
//             celda3.innerHTML = rooms[i]['max_occupancy'];
//             celda4.innerHTML = rooms[i]['occupancy'];
        
//             }
//         }
//    };

//       /****FIN FILTRO******/


    /*******INICIO HABITACIONES OCUPADAS Y LIBRES***********/

    //console.log(reservas.data.length)
    //console.log(bookings.length)
    //console.log(bookings)

    let colores = document.getElementById('habitacionesColores');
        
    colores.innerHTML=''
        for (let i = 0 ; i < bookings.length ; i++ ){

            if (bookings[i].booking_status == 'cancelled' ){
                
                let habitacionId = bookings[i].id; 
                colores.innerHTML += `
                                    <th  class="align-middle cell" style ="background:red" scope="row">Habitacion N° ${habitacionId} : No diponible</th>
                                     `
             }else {

               let habitacionId = bookings[i].id;
               colores.innerHTML += `
                                    <th  class="align-middle cell" style ="background:green" scope="row">Habitacion N° ${habitacionId} : Diponible</th>
                                      `
            }
        
        }
    
   
    
    /*******FINHABITACIONES OCUPADAS Y LIBRES***********/




}

mostrarPantalla();



    /****INICIO DESCARGANDO EXCEL*******/
    $(document).ready(() => {

        $("#btnExportar").click(function(){
        $("#tabla_rooms").table2excel({
            
            exclude: ".noExl",
            name: "Worksheet Name",
            filename: "Lista_Hotel", 
            fileext: ".xls" 
        }); 
        });
    })
    /****FIN DESCARGANDO EXCEL*******/




/***BOTON ARRIBA***/

$(document).ready(function(){ irArriba(); }); 

function irArriba(){
    $('.ir-arriba').click(function(){ $('body,html').animate({ scrollTop:'0px' },1000); });

    $(window).scroll(function(){
        if($(this).scrollTop() > 0){ $('.ir-arriba').slideDown(600); 
        }else
        { 
            $('.ir-arriba').slideUp(300); 
        }
    });

    $('.ir-abajo').click(function(){ $('body,html').animate({ scrollTop:'1000px' },1000); });
}

/***FIN BOTON ARRIBA****/



