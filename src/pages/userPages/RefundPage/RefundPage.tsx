import React, { useState, useEffect } from 'react';
import './RefundPage.css';
import NavBar from '../../../components/NavBar/NavBar';
import NavButtonsUser from '../../../components/NavButtonsUser/NavButtonsUser';
import Loader from '../../../components/Loader/Loader';
import { LoginContext } from '../../../LoginContext';
import { Api, APIResponse, APIStatus} from '../../../api/Api';

const RefundPage: React.FC = () => {
  const [orderId, setOrderId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [refundStatus, setRefundStatus] = useState('');
  const [messageClass, setMessageClass] = useState('');
  const {isLoadingUser, setIsLoadingUser} = React.useContext(LoginContext);

  const handleRefund = async () => {
    setIsLoading(true);
    console.log('Refund request for order ID:', orderId);
    const res = await Api.refundOrder(orderId);
    setIsLoading(false);
    setMessageClass(res.status === APIStatus.Success ? '' : 'refund-error');
    if (res.status === APIStatus.Success) {
      setRefundStatus('Refund request sent successfully');
    }
    else if(res.status === APIStatus.NotFound){ 
      setRefundStatus('Order Not found');
    }
    else if(res.status === APIStatus.BadRequest){
      // can be either invalid order ID or start date has passed
      setRefundStatus(res.data);
    }
    else{
      setRefundStatus('Server Error');
    }

  };

  return (
    <>
      <div className="refund-container" style={{ minHeight: '100vh' }}>
        <NavBar isUser={true} rightComponent={<NavButtonsUser pageName={"refund"} />} />
        <div className="refund">
          <h1>Refund Request</h1>
          <p>Please insert the order ID of the item you would like to refund:</p>
          <div className="form-group">
            <input
              type="text"
              id="orderId"
              className="form-control"
              placeholder="Enter Order ID"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
            />
          </div>
          <button onClick={handleRefund} className="blue-buttons" style={{ width: '150px', margin: '0' }}>
            Refund me!
          </button>
          {isLoading && <Loader />}
          {refundStatus !== '' && <p className={messageClass} style={{marginTop:"20px"}}>{refundStatus}</p>}
        </div>
      </div>
    </>

  );
};

export default RefundPage;
