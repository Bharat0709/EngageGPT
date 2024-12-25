import React, { useEffect, useState } from 'react';
import { Skeleton, message, Button, Avatar, Card } from 'antd';
import { FiUsers } from 'react-icons/fi';
import { AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineEye, AiOutlineSearch, AiOutlineUser } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { encodeToken } from '../../utils/tokenUtils';
import { setAuthTokenAction } from '../../redux/auth/authActions';
import Cookies from 'js-cookie';
import { getAllMembers } from '../../network/Members';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const authToken = Cookies.get('engage-gpt');
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    const token = new URLSearchParams(location.search).get('token');

    if (!token && !authToken) {
      toast.error('Session expired, please log in again.');
      navigate('/login');
      return;
    }

    if (token && !authToken) {
      const encodedToken = encodeToken(token);

      Cookies.set('engage-gpt', encodedToken, {
        expires: 3,
        secure: true,
        sameSite: 'strict',
      });

      dispatch(setAuthTokenAction(token));
    }
  }, [location.search, authToken, dispatch, navigate]);

  useEffect(() => {
    const fetchAndSetUserData = async () => {
      try {
        const data = await getAllMembers();
        console.log(data);
        if (data.length > 0) {
          setSelectedProfile(data[0]  );
        }

        // for (const member of data) {
        //   if (member.isConnected === 'connected') {
        //     setSelectedProfile(member);
        //   }
        // }
        console.log(data);
        setProfiles(data); // Assuming API fetches multiple profiles if available
      } catch (err) {
        console.error('Failed to fetch user data:', err.message);
        message.error('Failed to load user data. Please try again later.');
      }
    };

    fetchAndSetUserData();
  }, []);

  const handleProfileChange = (profile) => {
    setSelectedProfile(profile);
  };

  if (!selectedProfile) {
    return (
      <div className="dashboard-container bg-gray-100 min-h-screen flex flex-col items-center p-8">
        <Skeleton active />
      </div>
    );
  }
  const statistics = [
    {
      title: 'Followers',
      value: selectedProfile.followersCount,
      icon: <FiUsers />,
    },
    {
      title: 'Following',
      value: selectedProfile.followingCount,
      icon: <AiOutlineUser />,
    },
    {
      title: 'Connections',
      value: selectedProfile.connectionsCount,
      icon: <AiOutlinePlus />,
    },
    {
      title: 'Profile Views',
      value: selectedProfile.profileViews,
      icon: <AiOutlineEye />,
    },
    {
      title: 'Search Appearances',
      value: selectedProfile.searchAppearances,
      icon: <AiOutlineSearch />,
    },
    {
      title: 'Profile Completion',
      value: selectedProfile.completedProfileAspects?.length,
      suffix: `/${
        selectedProfile.completedProfileAspects?.length +
        selectedProfile.missingProfileAspects?.length
      }`,
      icon: <AiOutlineUser />,
    },
  ];

  return (
    <div className="bg-white h-full p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl">Home</h1>
        <div className="flex items-center space-x-6">
          <select
            value={selectedProfile.connectionToken}
            onChange={(e) =>
              handleProfileChange(
                profiles.find(
                  (profile) => profile.connectionToken === e.target.value,
                ),
              )
            }
            className="cursor-pointer rounded-xl border px-4 py-2"
          >
            {profiles.map((profile) => (
              <option
                key={profile.connectionToken}
                value={profile.connectionToken}
              >
                {profile.name}
              </option>
            ))}
          </select>

          <div className="flex items-center space-x-4">
            <FiUsers />
            <span className="text-gray-600">{profiles.length}</span>
            <Button
              type="primary"
              icon={<AiOutlinePlus />}
              className="global-button-primary rounded-md"
            >
              Add
            </Button>
          </div>
        </div>
      </div>

      {/* Profile Stats Section */}
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statistics.map((stat, index) => (
          <Card className="rounded-xl bg-gray-50" key={index}>
            <div className="flex  items-start">
              <div key={index} className="flex items-center gap-2 rounded">
                <div className="flex items-center">
                  <span className="text-lg mr-2">{stat.icon}</span>
                  <span className="">{stat.title}</span>
                </div>
                <div className="text-lg">
                  {stat.value}
                  {stat.suffix && (
                    <span className="text-lg ml-1">{stat.suffix}</span>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-6 p-6 bg-white rounded shadow">
        <div className="flex items-center space-x-4">
          <Avatar src={selectedProfile.profilePicture} size={64} />
          <div>
            <h2 className="text-lg font-bold">{selectedProfile.name}</h2>
            <p className="text-gray-600">{selectedProfile.email}</p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold">Steps to Complete Profile:</h3>
          <ul className="list-disc ml-6">
            {selectedProfile?.missingProfileAspects?.length === 0 ? (
              <li className="text-green-500">Profile is fully completed!</li>
            ) : (
              selectedProfile?.missingProfileAspects?.map((aspect, index) => (
                <li key={index}>{aspect}</li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
