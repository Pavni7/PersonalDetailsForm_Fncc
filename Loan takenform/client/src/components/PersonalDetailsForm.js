 


import React, { useState } from 'react';
import CompletionPage from './CompletionPage';



import './PersonalDetailsForm.css';

const PersonalDetailsForm = () => {
  const [step, setStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    phoneNumber: '',
    address: '',
    idType: '',
    issuingAuthority: '',
    idNumber: '',
    expirationDate: '',
    occupation: '',
    employerName: '',
    employerIdProof: '',
    monthlyIncome: '',
    sourceOfIncome: '',
    incomeProof: '',
    addressProof: '',
    accountType: '',
    accountNumber: '',
    bankName: '',
    branchName: '',
    ifscCode: '',
    username: '',
    password: '',
    securityQuestion1: '',
    securityAnswer1: '',
    securityQuestion2: '',
    securityAnswer2: '',
    maritalStatus: '',
    numberOfDependents: '',
    educationLevel: '',
    termsAccepted: false,
    idDocument: null // For file uploads
  });

  const nextStep = () => {
    if (step < 6) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep((prevStep) => prevStep - 1);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      idDocument: file, // Store the file in the formData
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting
    if (!formData.termsAccepted) {
      alert("You must accept the terms and conditions to proceed.");
      return;
    }
    // Submit the data to backend (or any further processing)
    console.log("Form Data Submitted: ", formData);


    const data = new FormData();
    for (const key in formData) {
      if (key === "idDocument" && formData.idDocument) {
        data.append(key, formData[key]);
      } else if (key === "termsAccepted") {
        data.append(key, formData[key] ? "true" : "false");
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch('http://localhost:5000/api/personal-details', {
        method: 'POST',
        body: data, // Sending FormData
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Success:', result.message);
        setIsCompleted(true);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
        console.error('Error:', errorData.message);
      }
    } catch (error) {
      setError('Submission failed, please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false); // Set loading to false after submitting
    }
  };

  if (isCompleted) {
    return <CompletionPage />;
  }

  return (
    <div className="app-container">
      <div className="form-content">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {error && <div className="error-message">{error}</div>}

          {/* {step === 1 && (
            <div className="form-section">
              <h3>Personal Details</h3>
              <div className="form-row">
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
              </div>
              <div className="form-row">
                <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} placeholder="Date of Birth" required />
                <input type="text" name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender" required />
              </div>
              <div className="form-row">
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" required />
              </div>
              <div className="form-row">
                <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
              </div>
              <button type="button" onClick={nextStep} disabled={loading}>Next: Identification Details</button>
            </div>
          )} */}
          {step === 1 && (
  <div className="form-section">
    <h3>Personal Details</h3>
    <div className="form-row">
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="First Name"
        required
      />
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Last Name"
        required
      />
    </div>
    <div className="form-row">
    <input
  type="date"
  name="dateOfBirth"
  value={formData.dateOfBirth}
  onChange={handleChange}
  onFocus={(e) => (e.target.type = 'date')} // Ensure the input type remains date
  onBlur={(e) => {
    if (!e.target.value) e.target.type = 'text'; // Show text if no date is selected
  }}
  placeholder='Date Of Birth'
  required
/>

      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        required
      >
        <option value="" disabled>
          Select Gender
        </option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="preferNotToSay">Prefer not to say</option>
      </select>
    </div>
    <div className="form-row">
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="text"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        placeholder="Phone Number"
        required
      />
    </div>
    <div className="form-row">
      <textarea
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Address"
        required
      />
    </div>
    <button type="button" onClick={nextStep} disabled={loading}>
      Next: Identification Details
    </button>
  </div>
)}


          {step === 2 && (
            <div className="form-section">
              <h3>Identification Details</h3>
              <div className="form-row">
                <input type="text" name="idType" value={formData.idType} onChange={handleChange} placeholder="ID Type (passport, Driving License, Aadhar, PAN card" required />
                {/* <label htmlFor="idDocument">Upload ID Document:</label>
                <input type="file" name="idDocument" onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png" required /> */}
                <input type="text" name="issuingAuthority" value={formData.issuingAuthority} onChange={handleChange} placeholder="Issuing Authority" required />
              </div>
              {/* <div className="form-row">
                <input type="text" name="idNumber" value={formData.idNumber} onChange={handleChange} placeholder="ID Number" required />
                <input type="date" name="expirationDate" value={formData.expirationDate} onChange={handleChange} placeholder="Expiration Date" required />
              </div> */}
              <div className="form-row">
                <input
                  type="text"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleChange}
                  placeholder="ID Number"
                  required
                />
                <div className="date-input-container">
                <input
                    type="date"
                    name="expirationDate"
                    value={formData.expirationDate}
                    onChange={handleChange}
                    onFocus={(e) => (e.target.type = 'date')} // Ensure the input type remains date
                    onBlur={(e) => {
                      if (!e.target.value) e.target.type = 'text'; // Show text if no date is selected
                    }}
                    placeholder="Expiration Date"
                    required
                  />
                  <i className="fa fa-calendar"></i>
                </div>
                </div>

              <div className="form-row">
                <label htmlFor="idDocument">Upload ID Document:</label>
                <input type="file" name="idDocument" onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png" required />
              </div>
              <button type="button" onClick={prevStep}  disabled={loading}>Previous</button>
              <button type="button" onClick={nextStep}  disabled={loading}>Next: Employment Details</button>
            </div>
          )}

          {step === 3 && (
            <div className="form-section">
              <h3>Employment/Income Details</h3>
              <div className="form-row">
                <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} placeholder="Occupation" />
                <input type="text" name="employerName" value={formData.employerName} onChange={handleChange} placeholder="Employer Name" />
                <input type="text" name="employerIdProof" value={formData.employerIdProof} onChange={handleChange} placeholder="Employer ID Proof" />
              </div>
              <div className="form-row">
                
                <input type="text" name="monthlyIncome" value={formData.monthlyIncome} onChange={handleChange} placeholder="Monthly Income" />
                <input type="text" name="sourceOfIncome" value={formData.sourceOfIncome} onChange={handleChange} placeholder="Source of Income(Salary, Business...)" />
              </div>
              <div className="form-row">
                
                <input type="text" name="incomeProof" value={formData.incomeProof} onChange={handleChange} placeholder="Income Proof" />
                <input
                      type="text"
                      name="addressProof"
                      value={formData.addressProof}
                      onChange={handleChange}
                      placeholder="Address Proof"/>

              </div>
              <button type="button" onClick={prevStep}  disabled={loading}>Previous</button>
              <button type="button" onClick={nextStep}  disabled={loading}>Next: Account Information</button>
            </div>
          )}

{step === 4&& (
  <div className="form-section">
    <h3>Account Information Details</h3>
    <div className="form-row">
      <input 
        type="text" 
        name="accountType" 
        value={formData.accountType} 
        onChange={handleChange} 
        placeholder="Account Type(Savings, Checking,..etc)" 
      />
      <input 
        type="text" 
        name="accountNumber" 
        value={formData.accountNumber} 
        onChange={handleChange} 
        placeholder="Account Number" 
      />
    </div>
    <div className="form-row">
      <input 
        type="text" 
        name="bankName" 
        value={formData.bankName} 
        onChange={handleChange} 
        placeholder="Bank Name" 
      />
      <input 
        type="text" 
        name="branchName" 
        value={formData.branchName} 
        onChange={handleChange} 
        placeholder="Branch Name" 
      />
    </div>
    <div className="form-row">
      <input 
        type="text" 
        name="ifscCode" 
        value={formData.ifscCode} 
        onChange={handleChange} 
        placeholder="IFSC Code" 
      />
    </div>
    <button type="button" onClick={prevStep}>Previous</button>
    <button type="button" onClick={nextStep}>Next: Security Details</button>
  </div>
)}
  {step === 5&& (
            <div className="form-section">
              <h3>Security Details</h3>
              <div className="form-row">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
              </div>
              <div className="form-row">
                <input
                  type="text"
                  name="securityQuestion1"
                  value={formData.securityQuestion1}
                  onChange={handleChange}
                  placeholder="Security Question 1"
                />
                <input
                  type="text"
                  name="securityAnswer1"
                  value={formData.securityAnswer1}
                  onChange={handleChange}
                  placeholder="Security Answer 1"
                />
              </div>
              <div className="form-row">
                <input
                  type="text"
                  name="securityQuestion2"
                  value={formData.securityQuestion2}
                  onChange={handleChange}
                  placeholder="Security Question 2"
                />
                <input
                  type="text"
                  name="securityAnswer2"
                  value={formData.securityAnswer2}
                  onChange={handleChange}
                  placeholder="Security Answer 2"
                />
              </div>
              <button type="button" onClick={prevStep}>
                Previous
              </button>
              <button type="button" onClick={nextStep}>
                Next: Additional Details
              </button>
            </div>
          )}

          {/* Step 6: Additional Details */}
          {step === 6 && (
            <div className="form-section">
              <h3>Additional Details</h3>
              <div className="form-row">
                <input
                  type="text"
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  placeholder="Marital Status"
                />
                <input
                  type="text"
                  name="numberOfDependents"
                  value={formData.numberOfDependents}
                  onChange={handleChange}
                  placeholder="Number of Dependents"
                />
              </div>
              <div className="form-row">
                <input
                  type="text"
                  name="educationLevel"
                  value={formData.educationLevel}
                  onChange={handleChange}
                  placeholder="Education Level"
                />
              </div>
              <div className="form">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                />
                <p>   By using this Finance Management App, you agree to our data protection policy and
          accept the responsibility to manage your finances within the boundaries of the law.
          We ensure compliance with all applicable regulations like GDPR, KYC, and AML.
          Please read our privacy policy to understand how we handle your data.</p>
                {/* <label htmlFor="termsAccepted">I read and accept all terms and conditions</label> */}
              </div>
              <button type="button" onClick={prevStep}>
                Previous
              </button>
              <button type="submit" onClick={nextStep}>
                Submit
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;        