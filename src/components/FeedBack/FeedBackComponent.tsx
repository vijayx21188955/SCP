import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axioData } from "../../utils/API";
import "./FeedBackComponent.scss";
import { toast } from 'react-toastify';

const FeedBackComponent: React.FC = () => {
  const [feedForm, setFeedForm] = useState<any>({
    comment: '',
    register: ''
  });
  const [feedBackList, setFeedBackList] = useState<any>([]);
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);

  const handleSubmit = async() => {
    let params = {
      Rating: 3.5,
      registeration_number: feedForm.register,
      Comments: feedForm.comment
    };

    const feedCreateResponse = await axioData('POST', 'rating-api/', params);
    console.log(feedCreateResponse);
    if(feedCreateResponse.status === '200') {
      toast('Feedback added');
      window.location.reload();
    } else {
      toast.error('Ensure this field has no more than 10 characters');
    }
  };

  const handleShowCreateForm = () => {
    setShowCreateForm((old) => !old);
  };

  const handleInputChange = (event: any) => {
    const { value, name } = event?.target;
    setFeedForm({
      ...feedForm,
      [name]: value,
    });
  };

  const getFeedbackList = async () => {
    const feedResponse: any = await axioData('GET', 'rating-api/', '');
    console.log("servce", feedResponse.data);
    setFeedBackList(feedResponse.data);
  };

  useEffect(() => {
    getFeedbackList();
  }, []);

  return (
    <section id="feedback" className="my-4">
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex justify-content-between">
            <Link to="/ourservice" className="btn btn-primary">
              Go back
            </Link>
            <Link to="/" className="btn btn-primary">
              Home
            </Link>
          </div>
          {feedBackList?.map((item: any, index: number) => (
            <div className="col-12 feedback-blk p-3 m-2" key={index}>
              <h3>{item.registeration_number}</h3>
              <p>{item.Comments}</p>
            </div>
          ))}
          {!showCreateForm ? (
            <div className="col-12 d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-lg btn-primary"
                onClick={handleShowCreateForm}
              >
                Create Feedback
              </button>
            </div>
          ) : (
            <form className="row g-3">
              <div className="col-md-12">
                <h4 className="text-center">Feedback</h4>
              </div>
              <div className="col-md-12">
                <label htmlFor="comment" className="form-label">
                  Register Number
                </label>
                <input
                  name="register"
                  className="form-control"
                  id="comment"
                  value={feedForm.register}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="comment" className="form-label">
                  Comments
                </label>
                <textarea
                  name="comment"
                  className="form-control"
                  id="comment"
                  value={feedForm.comment}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-12 d-flex justify-content-center">
                <button type="button" className="w-100 btn btn-lg btn-warning" onClick={handleShowCreateForm}>Cancel</button>
                <button type="button" className="ms-3 w-100 btn btn-lg btn-primary" onClick={handleSubmit}>Submit</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeedBackComponent;
