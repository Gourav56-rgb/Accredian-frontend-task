import React, { useState } from "react";
import { Alert, Modal } from "flowbite-react";
import toast from "react-hot-toast";

const Refer = () => {
  const [showModal, setShowModal] = useState(false);
  const [referrerInfo, setReferrerInfo] = useState({
    name: "",
    email: "",
    mobileNo: 0,
    relationshipToReferee: "",
    referrerID: "",
  });

  const [refereeInfo, setRefereeInfo] = useState({
    refereeName: "",
    refereeEmail: "",
    refereeMobileNo: 0,
    age: 0,
    currentEducationLevel: "",
    courseOfInterest: "",
  });

  const [courseInfo, setCourseInfo] = useState({
    courseName: "",
    courseID: "",
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER}/api/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ referrerInfo, refereeInfo, courseInfo }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error("Something went wrong");
        setError("Something went wrong");
        return;
      }
      if (res.ok) {
        setError(null);
        setReferrerInfo(data);
        setRefereeInfo(data);
        setCourseInfo(data);
        setShowModal(false);
        toast.success("Submitted successfully");
      }
    } catch (error) {
      setError("Something went wrong");
    }
  };

  const handleChange = (e) => {
    setReferrerInfo({ ...referrerInfo, [e.target.id]: e.target.value });
    setRefereeInfo({ ...refereeInfo, [e.target.id]: e.target.value });
    setCourseInfo({ ...courseInfo, [e.target.id]: e.target.value });
  };

  return (
    <div className="flex flex-wrap gap-[300px] border-2">
      <div className="mx-auto">
        <img
          className="w-[157px] h-[87px] top-[356px] left-[280px] p-1 mt-[200px]"
          src="https://s3-alpha-sig.figma.com/img/fb39/0c4b/10470aa903b54e8e9e856c5046a0fc6f?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UDjl0f7GDXPI6HyNHOMxQdY~5~1m81FusuTeeAz~W-CDF7lakVguaR02u-VQTSZIPD2TDdB4fSa-ZG3DKbJyEsxbgsWKiz~LiucdvfWw4nad7F~tSYyfnzL6Ug3IlCUahXO526p0AatPecrSo4ZXL4h3IiW9faNh7yhIUlrnZg~qkXuA2vfM6HJ2TXJw1jq32wYo~X0sRpkg339G~3HAZ~1jf-y3DDWXj2RwYF-bM7cFkJj39fiVwpBRigI2UUBvisipK-pGlsXbtSegyvakBYEHIEi4nf-98A4VAoZ9iga7n1257-kxPj0nGtjEZS6x-QpStVW7O2Qnw3OmzRK0MA__"
          alt=""
        />
        <h1 className="font-bold text-5xl">Let's Learn</h1>
        <h1 className="font-bold text-5xl">& Earn</h1>
        <h1 className="text-2xl">Get a chance to win</h1>
        <h1 className="text-2xl">
          up-to <span className="text-blue-600 font-bold">Rs. 15,000</span>
        </h1>
        <button
          onClick={() => {
            setShowModal(true);
          }}
          className="px-2 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 cursor-pointer"
        >
          Refer Now
        </button>
      </div>
      <div className="w-[814px] h-[725px] top-[269px] left-[788px] overflow-visible">
        <img
          className=""
          src="https://s3-alpha-sig.figma.com/img/6da5/530f/c90be82b93f2066608be1f96ef347467?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hIbh0cHW8rTmM860DX4~6Bf0tZgFlRVDcCJq1vgRkfZfjvUJ0~6ox9wYsO-qQ9R7CdUzK~09lhsg8-vQzN1MZ7xNYA-MtvlsOoJLC9xm6~YRIq2E4X5HYwvPC4tQw8dRdgAevuI0sSzUE6H-3uuZdu4ioHUI~qWqzoEyE8qvwkCKbal02~7fpDpgVreiA9xhSNAhP4Pi9VGj3tOHn7cPsCdYUsJufpLnQK7zf9Bhe~ZxOlekRM2QdociYG4bgLpe6U6RZFR6ImpQ8PQzww8j-m69ytI1zeA9PQdhXEXOSw5L2iLP6UMD8hV9uEB7ODNsuESyTo59t17DJFLkThXFKA__"
          alt=""
        />
      </div>
      {showModal && (
        <>
          <Modal
            show={showModal}
            onClose={() => setShowModal(false)}
            popup
            size="md"
          >
            <Modal.Header />
            <Modal.Body>
              <div className="text-center w-[500px]">
                <h1 className="text-center text-3xl my-7 font-semibold">
                  Refer a course
                </h1>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <h1 className="text-center text-3xl my-7 font-semibold">
                    ReferrerInfo
                  </h1>
                  <input
                    type="text"
                    required
                    id="name"
                    placeholder="Enter your name"
                    value={referrerInfo.name}
                    onChange={handleChange}
                  />
                  <input
                    type="email"
                    required
                    id="email"
                    placeholder="Enter your email"
                    value={referrerInfo.email}
                    onChange={handleChange}
                  />
                  <input
                    type="number"
                    required
                    id="mobileNo"
                    placeholder="Enter your mobile number"
                    value={referrerInfo.mobileNo}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    required
                    id="relationshipToReferee"
                    placeholder="What is your relationship to referee?"
                    value={referrerInfo.relationshipToReferee}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    required
                    id="referrerID"
                    placeholder="Enter your referrerId"
                    value={referrerInfo.referrerID}
                    onChange={handleChange}
                  />
                  <h1 className="text-center text-3xl my-7 font-semibold">
                    RefereeInfo
                  </h1>
                  <input
                    type="text"
                    required
                    id="refereeName"
                    placeholder="Enter referee's name"
                    value={refereeInfo.refereeName}
                    onChange={handleChange}
                  />
                  <input
                    type="email"
                    required
                    id="refereeEmail"
                    placeholder="Enter referee's email"
                    value={refereeInfo.refereeEmail}
                    onChange={handleChange}
                  />
                  <input
                    type="number"
                    required
                    id="refereeMobileNo"
                    placeholder="Enter referee's mobile number"
                    value={refereeInfo.refereeMobileNo}
                    onChange={handleChange}
                  />
                  <input
                    type="number"
                    required
                    id="age"
                    placeholder="Enter referee's age"
                    value={refereeInfo.age}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    required
                    id="currentEducationLevel"
                    placeholder="Enter referee's current education level"
                    value={refereeInfo.currentEducationLevel}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    required
                    id="courseOfInterest"
                    placeholder="Enter referee's course of interest"
                    value={refereeInfo.courseOfInterest}
                    onChange={handleChange}
                  />
                  <h1 className="text-center text-3xl my-7 font-semibold">
                    CourseInfo
                  </h1>
                  <input
                    type="text"
                    required
                    id="courseName"
                    placeholder="Enter course name referee has chosen"
                    value={courseInfo.courseName}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    required
                    id="courseID"
                    placeholder="Enter courseId referee has chosen"
                    value={courseInfo.courseID}
                    onChange={handleChange}
                  />
                  <div className="flex justify-center gap-4">
                    <button
                      type="submit"
                      className="px-2 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 cursor-pointer"
                    >
                      Submit
                    </button>
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-2 py-2 bg-red-600 text-white rounded hover:bg-red-500 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
              {error && (
                <Alert color="failure" className="mt-5">
                  {error}
                </Alert>
              )}
            </Modal.Body>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Refer;
