import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './ServiceDetailComponent.scss';
import { fetchData, fetchRequest } from '../../utils/API';
import HeaderComponent from '../HeaderComponent/HeaderComponent';

interface ServiceDetailComponentProps {
}

const ServiceDetailComponent: React.FC<ServiceDetailComponentProps> = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [serviceDetail, setServiceDetail] = useState<any>([]);
  const [showBookForm, setShowBookForm] = useState<boolean>(false);
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [bookFormData, setbookFormData] = useState<any>({
    customerName: '',
    customerEmail: '',
    registerNumber: '',
    serviceDate: new Date(),
  });
  const [editFormData, setEditFormData] = useState<any>({
    CategoryName: '',
    Category_Type: '',
    SubcategoryName: '',
    Description: '',
    Duration: '',
    OfferedPrice: '',
    ActualPrice: '',
    Discount: null,
    ServiceImageUrl: null
  });
  const [formError, setFormError] = useState<boolean>(false);
  const [enableBtn, setEnableBtn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>({});

  const handleGetData = async() => {
    const serviceDetail = await fetchData(`adminservice?ServiceID=${params.serviceId}`, false);
    setServiceDetail(serviceDetail);
  };

  const handleShowBookForm = () => {
    setShowBookForm(old => !old);
  };

  const handleShowEditForm = () => {
    setShowEditForm(old => !old);
    console.log('ser', serviceDetail);
    let temp = editFormData;
    temp.CategoryName = serviceDetail.CategoryName;
    temp.Category_Type = serviceDetail.Category_Type;
    temp.SubcategoryName = serviceDetail.SubcategoryName;
    temp.Description = serviceDetail.Description;
    temp.Duration = serviceDetail.Duration;
    temp.OfferedPrice = serviceDetail.OfferedPrice;
    temp.ActualPrice = serviceDetail.ActualPrice;
    temp.Discount = serviceDetail.Discount;
    console.log('remp', temp);
    setEditFormData(temp);
  };

  const handleServiceDelete = async () => {
    const deleteResponse = await fetchRequest('DELETE', `adminservice/${serviceDetail.ServiceID}`, '', false)
    console.log('deleteResponse', deleteResponse);
    navigate('/ourservice');
  };

  const handleInputChange = (event: any) => {
    setFormError(false);
    const {value, name} = event.target;
    console.log(value, name);
    setEnableBtn(true);
    setbookFormData({
      ...bookFormData,
      [name]: value  
    });
  };

  const handleEditInputChange = (event: any) => {
    setFormError(false);
    const {value, name} = event.target;
    setEditFormData({
      ...editFormData,
      [name]: value  
    });
  };

  const handleUpdateSubmit = async() => {
    console.log('editform', editFormData, serviceDetail.ServiceID);
    let temp = editFormData;
    temp.ServiceID = serviceDetail.ServiceID;
    const updateResponse = await fetchRequest('PUT', 'adminservice', temp, false);
    console.log('updateResponse', updateResponse);
    window.location.reload(); 
  };

  const handleSubmit = async() => {
    if(bookFormData.customerName && bookFormData.customerEmail && bookFormData.registerNumber && bookFormData.serviceDate) {
      setEnableBtn(false);
      const param = {
        CustomerName: bookFormData.customerName,
        CategoryName: serviceDetail.CategoryName,
        ServiceName: serviceDetail.SubcategoryName,
        ServiceDate:bookFormData.serviceDate,
        Comments: null,
        RegistrationNumber: bookFormData.registerNumber,
        EmailID: bookFormData.customerEmail
      }
      const bookServiceResponse = await fetchRequest('POST', 'bookingservices', param, false);
      toast(bookServiceResponse);
      navigate('/ourservice');
    } else {
      setFormError(true);
      setEnableBtn(true);
    }
  };

  useEffect(() => {
    console.log('prams', params.serviceId);
    let isLogin: any = localStorage.getItem("userInfo");
    if (isLogin) {
      setUserInfo(JSON.parse(isLogin));
    }
    handleGetData();
  }, []);

  return (
    <section className='service-detail-container p-5'>
      <div className='landing-backdrop' />
      <div className='container'>
          {userInfo.UserRole === 'Admin' && <HeaderComponent />}
          <div className='d-flex justify-content-between'>
            <Link to="/ourservice" className="btn btn-primary"> Go back</Link>
            <Link to="/" className="btn btn-primary"> Home</Link>
          </div>
          <h2 className='text-center'>{serviceDetail.CategoryName}</h2>
          <div className='service-detail-blk d-flex p-4 my-3'>
            <div className='img-container'>
              <img src='/assets/images/icons/ic-service.png' alt='img' />
            </div>
            <div className='details-content ms-4'>
              <div className='d-flex justify-content-between align-items-center'>
                <h2>{serviceDetail.SubcategoryName}</h2>
                <span className='badge bg-secondary ms-3'>{serviceDetail.Duration} Hrs Taken</span>
              </div>
              <p>{serviceDetail.Description}</p>
              <div className='d-flex justify-content-between'>
                <div className='d-flex align-items-center'>
                  <span className='fs-6 text-secondary'><s>Rs. {serviceDetail.ActualPrice}</s></span>
                  <span className='badge bg-success ms-3'>Offer Price</span>
                  <span className='fs-5 text-dark ms-3'>Rs. {serviceDetail.OfferedPrice}</span>
                </div>
                {userInfo.UserRole === 'Admin'
                  ? (<div>
                    <button className='btn btn-outline-primary btn-lg' onClick={handleShowEditForm}>Edit details</button>
                    <button className='ms-3 btn btn-outline-danger btn-lg' onClick={handleServiceDelete}>Delete</button>
                  </div>
                  )
                  : <button className='btn btn-outline-danger btn-lg' onClick={handleShowBookForm}>{showBookForm ? 'Cancel Book' : 'Book Service'}</button>
                }
              </div>
            </div>
          </div>
          {showEditForm &&
            (<div className='book-form-container'>
            <form className="row g-3">
              <div className="col-md-12">
                  <h4 className='text-center'>Update the details</h4>
                  {formError && <p className='mt-3 text-danger text-center'>All fields are mandatory</p> }
              </div>
              {/* <div className="col-md-6">
                <label htmlFor="CategoryName" className="form-label">Category Name*</label>
                <input type="text" name='CategoryName' className="form-control" id="CategoryName" value={editFormData.CategoryName} onChange={handleEditInputChange}/>
              </div>
              <div className="col-md-6">
                <label htmlFor="Category_Type" className="form-label">Category Type*</label>
                <input type="email" name='Category_Type' className="form-control" id="Category_Type" value={editFormData.Category_Type} onChange={handleEditInputChange}/>
              </div> */}
              <div className="col-md-6">
                <label htmlFor="SubcategoryName" className="form-label">Sub-Category Name*</label>
                <input type="text" name='SubcategoryName' className="form-control" id="SubcategoryName" value={editFormData.SubcategoryName} onChange={handleEditInputChange}/>
              </div>
              <div className="col-md-6">
                <label htmlFor="Duration" className="form-label">Duration*</label>
                <input type="number" name='Duration' className="form-control" id="Duration" value={editFormData.Duration} onChange={handleEditInputChange}/>
              </div>
              <div className="col-md-6">
                <label htmlFor="ActualPrice" className="form-label">ActualPrice*</label>
                <input type="text" name='ActualPrice' className="form-control" id="ActualPrice" value={editFormData.ActualPrice} onChange={handleEditInputChange}/>
              </div>
              <div className="col-md-6">
                <label htmlFor="OfferedPrice" className="form-label">OfferedPrice*</label>
                <input type="text" name='OfferedPrice' className="form-control" id="OfferedPrice" value={editFormData.OfferedPrice} onChange={handleEditInputChange}/>
              </div>
              <div className="col-md-12">
                <label htmlFor="Description" className="form-label">Description*</label>
                <textarea name='Description' className="form-control" id="Description" value={editFormData.Description} onChange={handleEditInputChange} />
              </div>
              <div className="col-12 d-flex justify-content-center">
                <button type="button" className="w-100 btn btn-lg btn-warning" onClick={handleShowEditForm}>Cancel</button>
                <button type="button" className="ms-3 w-100 btn btn-lg btn-primary" onClick={handleUpdateSubmit}>Update</button>
              </div>
            </form>
          </div>

            )
          }
          {showBookForm &&
            (<div className='book-form-container'>
              <form className="row g-3">
                <div className="col-md-12">
                    <h4 className='text-center'>To Confirm please fill the below details</h4>
                    {formError && <p className='mt-3 text-danger text-center'>All fields are mandatory</p> }
                </div>
                <div className="col-md-6">
                  <label htmlFor="customerName" className="form-label">Customer Name*</label>
                  <input type="text" name='customerName' className="form-control" id="customerName" value={bookFormData.customerName} onChange={handleInputChange}/>
                </div>
                <div className="col-md-6">
                  <label htmlFor="customerEmail" className="form-label">Customer Email*</label>
                  <input type="email" name='customerEmail' className="form-control" id="customerEmail" value={bookFormData.customerEmail} onChange={handleInputChange}/>
                </div>
                <div className="col-md-6">
                  <label htmlFor="registerNumber" className="form-label">Registration Number*</label>
                  <input type="text" name='registerNumber' className="form-control" id="registerNumber" value={bookFormData.registerNumber} onChange={handleInputChange}/>
                </div>
                <div className="col-md-6">
                  <label htmlFor="serviceDate" className="form-label">Service Date*</label>
                  <input type="date" name='serviceDate' className="form-control" id="serviceDate" value={bookFormData.serviceDate} onChange={handleInputChange}/>
                </div>
                <div className="col-12">
                  <button type="button" className="w-100 btn btn-lg btn-primary" disabled={!enableBtn} onClick={handleSubmit}>Confirm</button>
                </div>
              </form>
            </div>)
          }
          
      </div>
    </section>
  );
};

export default ServiceDetailComponent;
