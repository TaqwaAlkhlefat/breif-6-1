import axios from "axios";
import { useEffect, useState } from "react";
import React from 'react';
import { Grid, GridItem, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter, Button } from '@chakra-ui/react'

export default function ContractList() {
  const [contracts, setContracts] = useState([]);
  const [showPopup, setShowPopup] = useState(false); // New state variable

  useEffect(() => {
    getContracts();
  }, []);

  function getContracts() {
    axios.get('http://localhost/api-Taqwa/Contracts/').then(function(response) {
      console.log(response.data);
      setContracts(response.data);
    });
  }

  // Event handler for button click
  const openPopup = () => {
    setShowPopup(true);
  }

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', margin: '50px' }}>
        {contracts.map((contract, index) => (
          <div className="card" key={contract.id} style={{ width: '19rem',  }}>
            <div className="card-body">
              <h5 className="card-title">{contract.contract_name}</h5>
              <p className="card-text">
                <strong>Signing:</strong> {contract.signing_date}
              </p>
              <p className="card-text">
                <strong>Expiration:</strong> {contract.expiration_date}
              </p>
              <p className="card-text">
                <strong>Total Cost:</strong> {contract.total_cost}
              </p>
              <p className="card-text">
                <strong>Employee Number:</strong> {contract.employee_id}
              </p>
              <div className="card-footer">
                <button className="btn btn-primary m-2" onClick={openPopup}>Contract Details</button>
                <button className="btn btn-primary m-2">Company Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={React.useRef(null)}
        onClose={() => setShowPopup(false)}
        isOpen={showPopup}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Contract Details</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <div>
            <b>Scope of Services: The Provider agrees to deliver premium system services to the Client as outlined in the accompanying service agreement. These services include software customization, maintenance, technical support, and feature enhancements.</b>
            <b> Term: This Contract shall commence on the effective date stated herein and shall remain in effect for the duration specified in the service agreement, unless terminated earlier as per the termination provisions outlined within.</b>
            <b>Payment and Fees: The Client agrees to compensate the Provider according to the payment terms outlined in the service agreement.</b>
            <b>Confidentiality: Both Parties acknowledge their obligation to maintain the confidentiality of any proprietary or sensitive information disclosed during the course of this Contract. </b>
            <b>Termination: Either Party may terminate this Contract by providing written notice to the other Party in accordance with the termination provisions specified in the service agreement.</b>
            <b>Governing Law: This Contract shall be governed by and construed in accordance with the laws of the jurisdiction specified in the service agreement.</b>
            </div>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={React.useRef(null)} onClick={() => setShowPopup(false)}>
              Ok 
            </Button>
            {/* <Button colorScheme='red' ml={3}>
              Yes
            </Button> */}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
