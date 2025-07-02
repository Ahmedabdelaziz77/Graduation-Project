// UserDetails.jsx
import { Divider } from "@mui/material";
import ProfileFieldCard from "../../../components/ProfileFieldCard";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUserProfile } from "../../../State/profileSlice";
import moment from "moment";
import Spinner from "../../../components/Spinner";

function UserDetails() {
  const dispatch = useDispatch();
  const {
    data: profile,
    loading,
    error,
  } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  if (loading)
    return (
      <div className="text-center py-10">
        <Spinner />
      </div>
    );
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!profile) return null;

  return (
    <div className="flex justify-center by-10">
      <div className="w-full lg:w-[70%]">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600">Personal Details</h1>
        </div>
        <div>
          <ProfileFieldCard
            label="Name"
            value={`${profile.firstname} ${profile.lastname}`}
          />
          <Divider />
          <ProfileFieldCard label="Email" value={profile.email} />
          <Divider />
          <ProfileFieldCard label="Mobile" value={profile.mobile} />
          <Divider />
          <ProfileFieldCard label="User ID" value={profile.userId} />
          <Divider />
          <ProfileFieldCard
            label="Account Created"
            value={moment(profile.createdAt).format("MMMM Do YYYY, h:mm a")}
          />
          <Divider />
          <ProfileFieldCard
            label="Last Updated"
            value={moment(profile.updatedAt).format("MMMM Do YYYY, h:mm a")}
          />
          <Divider />
          {profile.seller ? (
            <>
              <ProfileFieldCard
                label="Seller Name"
                value={profile.seller.name}
              />
              <Divider />
              <ProfileFieldCard
                label="Seller Status"
                value={profile.seller.status || "N/A"}
              />
              <Divider />
            </>
          ) : (
            <ProfileFieldCard label="Seller" value="Not a seller" />
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
