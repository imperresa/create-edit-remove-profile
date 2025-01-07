import { useEffect, useState } from "react";
import axios from 'axios'
import ProfileList from "./componens/ProfileList";
import Alert from '@mui/material/Alert';

import "./App.css";

function App() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [nickname, setNickname] = useState("");
  const [birth, setBirth] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [profile, setProfile] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);

  const handleAgeCalculation = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    const calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      return calculatedAge - 1;
    }
    return calculatedAge;
  };

    const submit = async (e) => {
    e.preventDefault();
    if (!firstname || !lastname || !birth || !gender) {
      setAlertMessage("Please fill in all required fields.");
      setTimeout(() => setAlertMessage(""), 1000);
      return;}
    try{
      const newProfile = { firstname, lastname, nickname, birth, age, gender }
      await axios.post('http://localhost:4000/',newProfile)
      getProfile()
      setAlertMessage('Successful'),3000
      setTimeout(() => setAlertMessage(""), 1000);
    }catch(error){
      console.log(error);
    }
    setFirstName("");
    setLastName("");
    setNickname("");
    setBirth("");
    setAge("");
    setGender("");
  };

  const getProfile = async () =>{
    try{
      const response = await axios.get('http://localhost:4000/profiles')
      setProfile(response.data)
    }catch(error){
      console.log(error);
    }
  }

  const deleteProfile = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/profiles/${id}`);
      setProfile((prevProfiles) => prevProfiles.filter((profile) => profile.id !== id));
      getProfile()
    } catch (error) {
      console.log(error);
    }
  };

  const editProfile = async (id, updatedProfile) => {
    try {
      await axios.put(`http://localhost:4000/edit/${id}`,updatedProfile);
      setProfile((prevProfiles) =>
        prevProfiles.map((p) => (p.id === id ? { ...updatedProfile, id } : p))
      );
      getProfile()
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    getProfile()
  },[])

  return (
    <>
      <div className=" flex pt-5 justify-center relative">
      {alertMessage && (
    <Alert
      severity={alertMessage.includes('Successful') ? "success" : "error"}
      onClose={() => setAlertMessage(null)}
      className="absolute top-3 z-10"
    >
      {alertMessage}
    </Alert>
  )}

        <form
          className="drop-shadow-2xl bg-slate-300 rounded-md flex flex-col items-center"
          onSubmit={submit}
        >
          <h1 className="text-xl font-bold">Profile</h1>
          <div>
            <div className="flex gap-4 justify-center pl-5 pt-5">
              <div className="flex flex-col gap-2">
                <label>Firstname</label>
                <input type="text" value={firstname} onChange={(e) => setFirstName(e.target.value)}/>
              </div>
              <div className="flex flex-col gap-2">
                <label>Lastname</label>
                <input type="text" value={lastname} onChange={(e) => setLastName(e.target.value)}/>
              </div>
              <div className="flex flex-col gap-2">
                <label>Nickname</label>
                <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)}/>
              </div>
              <br />
            </div>
            <div className="flex gap-4 p-5">
              <div className="flex flex-col gap-2">
                <label>Date of Birth</label>
                <input
                  type="date"
                  value={birth}
                  onChange={(e) => {
                    setBirth(e.target.value),
                      setAge(handleAgeCalculation(e.target.value));
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Age</label>
                <input type="number" value={age} readOnly />
              </div>
              <div className="flex flex-col gap-2">
                <label>Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">-</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
          </div>
          <button className="bg-white w-20 h-10 mb-2 rounded-lg hover:bg-black">
            <h1 type="submit" className="text-black hover:text-white">
              Save
            </h1>
          </button>
        </form>
      </div>
      {
        profile.map((p)=>(
          <ProfileList 
          key={p._id}
          profile={p}
          deleteProfile={deleteProfile} 
          editProfile={editProfile}
          submit={submit}
          />
        ))
      }
      
    </>
  );
}

export default App;
