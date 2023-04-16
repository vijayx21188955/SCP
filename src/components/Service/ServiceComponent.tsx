import React, { useEffect, useState } from "react";
// import { service } from '../../utils/mockData';
import "./ServiceComponent.scss";
import { Link } from "react-router-dom";
import { fetchData, fetchRequest } from "../../utils/API";
import { toast } from "react-toastify";
import HeaderComponent from '../HeaderComponent/HeaderComponent';

const ServiceComponent: React.FC = () => {
  const [allService, setAllService] = useState<any>([]);
  const [userInfo, setUserInfo] = useState<any>({});
  const [formError, setFormError] = useState<boolean>(false);
  const [enableBtn, setEnableBtn] = useState<boolean>(false);
  const [activeService, setActiveService] = useState<any>({});

  const [createFormData, setCreateFormData] = useState<any>({
    CategoryName: "",
    Category_Type: "",
    SubcategoryName: "",
    Description: "",
    Duration: "",
    OfferedPrice: "",
    ActualPrice: "",
    Discount: null,
    ServiceImageUrl: null,
  });

  const handleCreateInputChange = (event: any) => {
    setFormError(false);
    const { value, name } = event.target;
    console.log(value, name);
    setEnableBtn(true);
    setCreateFormData({
      ...createFormData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (
      createFormData.CategoryName &&
      createFormData.Category_Type &&
      createFormData.SubcategoryName &&
      createFormData.Description &&
      createFormData.Duration &&
      createFormData.OfferedPrice &&
      createFormData.ActualPrice
    ) {
      setEnableBtn(false);
      const createService = await fetchRequest(
        "POST",
        "adminservice",
        createFormData,
        false
      );
      toast(createService);
      window.location.reload();
    } else {
      setFormError(true);
      setEnableBtn(true);
    }
  };

  const handleShowCreateForm = (obj: any) => {
    setActiveService(obj);
    setCreateFormData((prevState: any) => ({
      ...createFormData,
      CategoryName: obj.CategoryName,
      Category_Type: obj.Category_Type,
    }));
  };

  const getServiceList = async () => {
    const service: any = await fetchData("adminservice", false);
    const groupByCategory = service?.reduce((group: any, product: any) => {
      const { Category_Type } = product;
      group[Category_Type] = group[Category_Type] ?? [];
      group[Category_Type].push(product);
      return group;
    }, {});
    setAllService(groupByCategory);
  };

  useEffect(() => {
    getServiceList();
    let isLogin: any = localStorage.getItem("userInfo");
    if (isLogin) {
      setUserInfo(JSON.parse(isLogin));
    }
  }, []);

  return (
    <div className="service-container">
      <div className="container">
        {userInfo.UserRole === 'Admin' && <HeaderComponent />}
        <div className="d-flex justify-content-between">
          <Link to="/" className="btn btn-primary">
            Go back
          </Link>
          <Link to="/" className="btn btn-primary">
            Home
          </Link>
        </div>
        <h1 className="text-center">Our Services</h1>
        <section className="my-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Car service Available</h2>
          </div>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>

          {Object.keys(allService).map((key) => (
            <>
              <h2 className="text-center">
                {allService[key][0]?.CategoryName}
              </h2>
              <div className="service-blk d-flex flex-wrap justify-content-center align-items-center">
                {allService[key].map((item: any, index: number) => (
                  <Link to={`/service/${item?.ServiceID}`}>
                    <div
                      className="service-item d-flex flex-column justify-content-center align-items-center"
                      key={index}
                    >
                      <img
                        src="/assets/images/icons/ic-service.png"
                        width="150"
                        alt="img"
                      />
                      <span>{item?.SubcategoryName}</span>
                    </div>
                  </Link>
                ))}
                {userInfo?.UserRole === "Admin" && (
                  <div
                    className="service-item d-flex flex-column justify-content-center align-items-center"
                    onClick={() => handleShowCreateForm(allService[key][0])}
                  >
                    <span>Add service</span>
                  </div>
                )}
              </div>
              <div>
                {activeService.Category_Type ===
                  allService[key][0]?.Category_Type && (
                  <div className="book-form-container">
                    <form className="row g-3">
                      <div className="col-md-12">
                        <h4 className="text-center">Create new service</h4>
                        {formError && (
                          <p className="mt-3 text-danger text-center">
                            All fields are mandatory
                          </p>
                        )}
                      </div>
                      {/* <div className="col-md-6">
                        <label htmlFor="CategoryName" className="form-label">
                          Category Name*
                        </label>
                        <input
                          type="text"
                          name="CategoryName"
                          className="form-control"
                          id="CategoryName"
                          value={createFormData.CategoryName}
                          onChange={handleCreateInputChange}
                          readOnly
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="Category_Type" className="form-label">
                          Category Type*
                        </label>
                        <input
                          type="email"
                          name="Category_Type"
                          className="form-control"
                          id="Category_Type"
                          value={createFormData.Category_Type}
                          onChange={handleCreateInputChange}
                          readOnly
                        />
                      </div> */}
                      <div className="col-md-6">
                        <label htmlFor="SubcategoryName" className="form-label">
                          Sub-Category Name*
                        </label>
                        <input
                          type="text"
                          name="SubcategoryName"
                          className="form-control"
                          id="SubcategoryName"
                          value={createFormData.SubcategoryName}
                          onChange={handleCreateInputChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="Duration" className="form-label">
                          Duration*
                        </label>
                        <input
                          type="number"
                          name="Duration"
                          className="form-control"
                          id="Duration"
                          value={createFormData.Duration}
                          onChange={handleCreateInputChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="ActualPrice" className="form-label">
                          ActualPrice*
                        </label>
                        <input
                          type="number"
                          name="ActualPrice"
                          className="form-control"
                          id="ActualPrice"
                          value={createFormData.ActualPrice}
                          onChange={handleCreateInputChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="OfferedPrice" className="form-label">
                          OfferedPrice*
                        </label>
                        <input
                          type="number"
                          name="OfferedPrice"
                          className="form-control"
                          id="OfferedPrice"
                          value={createFormData.OfferedPrice}
                          onChange={handleCreateInputChange}
                        />
                      </div>
                      <div className="col-md-12">
                        <label htmlFor="Description" className="form-label">
                          Description*
                        </label>
                        <textarea
                          name="Description"
                          className="form-control"
                          id="Description"
                          value={createFormData.Description}
                          onChange={handleCreateInputChange}
                        />
                      </div>
                      <div className="col-12 d-flex justify-content-center">
                        <button
                          type="button"
                          className="w-100 btn btn-lg btn-warning"
                          onClick={() => handleShowCreateForm({})}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="ms-3 w-100 btn btn-lg btn-primary"
                          disabled={!enableBtn}
                          onClick={handleSubmit}
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </>
          ))}
        </section>
      </div>
    </div>
  );
};

export default ServiceComponent;
