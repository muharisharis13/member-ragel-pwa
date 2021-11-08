import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { FaTimes } from 'react-icons/fa'
import { ChangePassword } from '../../../../services/API/account'

export const ModalResetPass = ({ show, onHide }) => {
  const [old, setOld] = useState('')
  const [newPass, setNewPass] = useState('')

  const btnSave = () => {
    const body = {
      old_password: old,
      new_password: newPass
    }
    ChangePassword({ body: body })
      .then(res => {
        console.log(res)
        if (res.error) {
          alert(`${res.error}`)
        }
        else {
          alert(`${res.success.message}`)
          window.location.reload()
        }
      })
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <FaTimes cursor="pointer" onClick={onHide} />
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-12 col-sm-12">
              <form>
                <div className="mb-3">
                  <label for="old" class="form-label">Old Password</label>
                  <input type="password" class="form-control" id="old" placeholder="Old Password"
                    value={old} onChange={(e) => setOld(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label for="new" class="form-label">New Password</label>
                  <input type="password" class="form-control" id="new" placeholder="New Password"
                    value={newPass} onChange={(e) => setNewPass(e.target.value)} />
                </div>
                <div className="mb-3">
                  <button
                    className="btn btn-warning btn-md text-white font-weight-bold"
                    onClick={btnSave}
                    style={{ width: '100%' }}
                  >
                    SAVE
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
