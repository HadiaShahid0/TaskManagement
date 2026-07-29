import Navbar from "../../../components/common/navbar";
import Footer from "../../../components/common/footer";
import ProfileCard from "../components/profileCard";

const Profile = () => {
  return (
    <>
    <Navbar/>
    <div className="container mt-5">
      <ProfileCard />
    </div>
    <Footer/>
    </>
  );
};

export default Profile;
