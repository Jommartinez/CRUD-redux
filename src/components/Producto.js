import React from 'react'
import {useHistory} from 'react-router-dom'

//redux
import {useDispatch} from 'react-redux'
import { borrarProductoAction, obtenerProductoEditar} from '../actions/productoActions'
import Swal from 'sweetalert2'

const Producto = ({producto}) => {

    const {nombre, precio, id}= producto

    const dispatch = useDispatch()
    const history = useHistory() //habilitar history para redireccion

    //confirmar si desea aliminar
    const confirmarEliminarProducto = id => {
        //preguntar al user
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Un producto que se elimine, no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                //pasar al action
                dispatch(borrarProductoAction(id))  
            }
        })
    }

    //funcion que redirige de forma programada
    const redireccionarEdicion = producto => {
        dispatch(obtenerProductoEditar(producto))
        history.push(`/productos/editar/${producto.id}`)
    }

    return ( 
        <tr>
            <td>{nombre}</td>
            <td>{precio} €</td>
            <td className="acciones">
                <button 
                type="button"
                    onClick={() => redireccionarEdicion(producto)}
                    className="btn btn-primary mr-2"
                >Editar</button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => confirmarEliminarProducto(id)}
                >Eliminar</button>
            </td>
        </tr>
     )
}
 
export default Producto