import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import styled from 'styled-components'
import { UploadBuktiTopup } from '../../../component/Modal/topup/UploadBuktiTopup'
import { TopUpDepoHistori } from '../../../services/API/deposit'
import { currency } from '../../../utl/currency-format'

export const HistoryTopUp = () => {
  const [data, setData] = useState([])
  const [show, setShow] = useState(false)
  const [dataprops, setDataporps] = useState({})

  useEffect(() => {
    TopUpDepoHistori()
      .then(res => {
        console.log(res)

        if (res.success) {
          setData(res.success)
        }
        else {
          setData([])
        }
      })
  }, [])

  const btnShowModalTopUp = ({ type, index }) => {
    switch (type) {
      case 'buka':
        setShow(true)
        setDataporps(data[index])
        break;
      case 'tutup':
        setShow(false)
        break;

      default:
        break;
    }
  }

  return (

    <Container>
      {/* Modal */}
      <UploadBuktiTopup show={show} data={dataprops} onHide={() => btnShowModalTopUp({ type: 'tutup' })} />
      {/* end */}
      <div className="container">
        <h2>History Topup</h2>
        <div className="row">
          <div className="col-md-12 col-sm-12 col-lg-12">
            <Table bordered size="sm" responsive="lg">
              <thead className="text-center" >
                <tr>
                  <th>Date & Time</th>
                  <th>Member ID</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.length > 0 ? data.map((item, index) => (
                    <tr key={index}>
                      <td>{moment(item.created_at).format("YYYY MMM DD - hh:mm")}</td>
                      <td>{item.member_id}</td>
                      <td>{currency(item.deposit_amount)}</td>
                      <td>{item.status}</td>
                      <td>
                        {
                          item.status === "paid" ? "No Available" :
                            <Button onClick={() => btnShowModalTopUp({ type: 'buka', index: index })}>Upload</Button>
                        }
                      </td>
                    </tr>

                  ))
                    : "nothing Data"
                }
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </Container>
  )
}

const Button = styled.div`
display:flex;
align-items:center;
justify-content: center;
cursor: pointer;
border:1px solid #ffc107;
padding:7px 10px;
background:#ffc107;
color:#fff;
font-weight : 500;
transition:450ms;
&:hover{
  background-color: transparent;
  color:#000;
}
`

const Container = styled.div`
  /* background:gray; */
  height: 100vh;
  padding-top: 150px;
`;
