import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'
import { FiTrash2 } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import product from '../../Images/product/WhatsApp Image 2021-06-22 at 22.09.57.jpeg'
import { useContext } from 'react';
import { Context } from '../../Context/Context'
import { currency } from '../../utl/currency-format';
import { GetAllCart, RemoveCart } from '../../services/API/product';

export const Cart = () => {
    const { cart, dispatch } = useContext(Context)
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)

    useEffect(() => {
        GetAllCart()
            .then(res => {
                console.log(res.success)
                if (res.success) {
                    setData(res.success)
                    dispatch({ type: 'CART', cart: res.success })
                }
            })
    }, [])



    const btnincrement = ({ type, index, price, qty }) => {

        switch (type) {
            case 'tambah':
                setData(data.map(id => id.id === index ? { ...id, qty: parseInt(id.qty) + parseInt(1) } : id))
                break;
            case 'kurang':
                setData(data.map(id => id.id === index ? { ...id, qty: parseInt(id.qty) - parseInt(1) } : id))
                break;

            default:
                // console.log('')
                break;
        }
    }



    const grandTotalProduct = data.reduce((prev, current) => {
        return prev + + current.qty
    }, 0)

    useEffect(() => {
        setTotal(
            data.reduce((prev, current) => {
                return (prev + + current.selling_price) * current.qty
            }, 0)
        )
    }, [data])

    const btnRemove = (id) => {
        const body = {
            product_id: id
        }
        RemoveCart({ body: body })
            .then(res => {
                console.log(res)
                if (res.success) {
                    alert(`${res.success}`)
                    GetAllCart()
                        .then(res => {
                            if (res.success) {
                                setData(res.success)
                                dispatch({ type: 'CART', cart: res.success })
                                if (res.success.length === 0) {
                                    window.location.href = "/home"
                                }
                            }
                        })
                }
            })
    }

    console.log(data)
    return (
        <Container className='container-fluid'>
            <div className='col-sm-10 mx-auto '>
                <Title>Cart</Title>
                <Table responsive="lg" borderless className='my-3'>
                    <thead className="shadow-sm p-3 mb-5 bg-white rounded border rounded">
                        <tr>
                            <th><input type="checkbox" /></th>
                            <th>Products</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.length > 0 ? data.map((item, index) => (
                                <tr className="border-bottom justify-content-center align-items-center" key={index}>
                                    <td className="align-middle">
                                        <input type="checkbox" />
                                    </td>
                                    <TdProduct className="align-middle">
                                        <ImageProduct src={item.product_pic_url} className="img-fluid rounded" alt="Product" />&nbsp; <b>{item.product_name}</b>
                                    </TdProduct>
                                    <td className="align-middle">
                                        <b>{currency(item.selling_price)}</b>
                                    </td>
                                    <td className="align-middle" >
                                        <div style={{ display: 'inline-flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                            <AiOutlineMinusCircle cursor="pointer" size={23}
                                                onClick={item.qty === 1 ? "" : () => btnincrement({ index: item.id, type: 'kurang', price: item.selling_price, qty: item.qty })} />
                                            &nbsp;<BgGray>{item.qty}</BgGray> &nbsp;
                                            <AiOutlinePlusCircle cursor="pointer" size={23} onClick={() => btnincrement({ index: item.id, type: 'tambah', price: item.selling_price, qty: item.qty })} />

                                        </div>
                                    </td>
                                    <td className="align-middle">
                                        <b>{currency(parseInt(item.qty) * parseInt(item.selling_price))}</b>
                                    </td>
                                    <td className="align-middle">
                                        <FiTrash2 cursor="pointer" size={25} onClick={() => btnRemove(item.id)} />
                                    </td>
                                </tr>

                            ))
                                : 'No Cart List'
                        }
                        <tr className="justify-content-center align-items-center">
                            <td colSpan="3">&nbsp;</td>
                            <td><b>{grandTotalProduct} prodcut(s)</b></td>
                            <td><h3 className="text-warning">{currency(total)}</h3></td>
                        </tr>
                        <tr className="justify-content-center align-items-center">
                            <td colSpan="3">&nbsp;</td>
                            <td colspan="2"><Link to={{ pathname: "/checkout", state: { keranjang: data, total: total } }}><button className="btn btn-warning text-white col-sm-10">Checkout</button></Link></td>
                        </tr>
                    </tbody>
                </Table>
            </div>

        </Container>
    )
}

const TdProduct = styled.td`
@media only screen and (min-width:320px) and (max-width:768px) {
    display: flex;
    /* background:red; */
    width: 200px;
    align-items: center;
}
`

const Container = styled.div`
/* background:gray; */
height: 100vh;
padding-top:150px;
`
const Title = styled.span`
font-size:20pt;
`

const ImageProduct = styled.img`
width:130px;
height:130px;
object-fit:cover;
`

const BgGray = styled.span`
background-color:rgba(0,0,0,.1);
padding:3px 10px
`