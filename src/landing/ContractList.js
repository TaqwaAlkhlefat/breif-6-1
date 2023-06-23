import axios from "axios";
import { useEffect, useState } from "react";
import React from 'react';
import { useDisclosure, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter, Button } from '@chakra-ui/react'

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

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  function getRemainingDays(expirationDate) {
    const currentDate = new Date();
    const end = new Date(expirationDate);
    const diffInTime = end.getTime() - currentDate.getTime();
    const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));
    return diffInDays;
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', textAlign: 'center', margin: '80px' }}>
          {contracts.map((contract, index) => {
            const remainingDays = getRemainingDays(contract.expiration_date);
            let alertType;
            if (remainingDays < 3) {
              alertType = 'alert-danger'; // Red color
            } else if (remainingDays < 10) {
              alertType = 'alert-warning'; // Yellow color
            } else {
              alertType = 'alert-success'; // Green color
            }

            return (
              <div className="card" key={contract.id} style={{ width: '23rem' }}>
                <div className="card-body">
                  <h4 className="card-title">{contract.contract_name}</h4>
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
                  <div className="card-footer" style={{ textAlign: 'center' }}>
                    <button className="btn btn-primary btn-sm m-2" onClick={openPopup}>Contract Details</button>
                    <p></p>
                    <button className="btn btn-primary m-2" onClick={onOpen}>Company Details</button>
                    <div className={`alert p-4 ${alertType}`}>
                      <span>Left for this offer: {remainingDays} Days</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
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
          <AlertDialogHeader>Contract Details: </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <div>
              <p>Scope of Services:</p> The Provider agrees to deliver premium system services to the Client as outlined in the accompanying service agreement. <p> </p>
              <p>Term:</p> This Contract shall commence on the effective date stated herein and shall remain in effect for the duration specified in the service agreement, unless terminated earlier as per the termination provisions outlined within.
              <p>Termination:</p> Either Party may terminate this Contract by providing written notice to the other Party in accordance with the termination provisions specified in the service agreement.
            </div>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={React.useRef(null)} onClick={() => setShowPopup(false)}>
              Ok
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Company Details: </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
          Welcome to our network company! We are a leading provider of advanced networking solutions for businesses of all sizes. With our state-of-the-art technology and expert team, we deliver reliable and high-performance networking infrastructure tailored to meet your specific needs. Whether you require secure data connectivity, seamless wireless networks, or robust network management, we have you covered. Our commitment to exceptional service ensures that your network operates smoothly, allowing you to focus on your core business. Trust us for all your networking requirements and experience the power of a reliable and efficient network infrastructure
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Ok
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
