class ProfilePage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        profileData: null,
        loading: false,
        error: null,
      };
    }
  
    componentDidMount() {
      this.fetchProfileData();
    }
  
    fetchProfileData() {
      this.setState({ loading: true });
      axios.get('/user/profile')
        .then(response => {
          this.setState({ profileData: response.data, loading: false });
        })
        .catch(error => {
          this.setState({ error: error.message, loading: false });
        });
    }
  
    render() {
      const { profileData, loading, error } = this.state;
  
      if (loading) {
        return <div>Loading...</div>;
      }
  
      if (error) {
        return <div>Error: {error}</div>;
      }
  
      return (
        <div>
          {profileData && (
            <div>
              <h2>Profile</h2>
              <p>Username: {profileData.username}</p>
              <p>Email: {profileData.email}</p>
              {/* Render other profile data */}
            </div>
          )}
        </div>
      );
    }
  }