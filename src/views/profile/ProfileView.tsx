import { ProfileForm } from '../../components/profile/ProfileForm';
import { useAuth } from '../../hooks/useAuth';

const ProfileView = () => {
  const { data, isLoading } = useAuth();

  if (isLoading)
    return <div className="text-2xl text-center mt-10">Loading...</div>;

  if (data) return <ProfileForm data={data} />;
};

export default ProfileView;
