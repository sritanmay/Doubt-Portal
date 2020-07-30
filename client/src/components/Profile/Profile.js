import React from 'react';

const Profile = ({ user }) => {
    return (
    	<div id="myinfo">{/*My Info section*/}
        <div><p className="f1" style={{ 'textAlign':'center', 'color':'white', 'marginTop':'50px'}}>Profile</p></div>
        <div className="br2 mt0 pv2-m pv1-ns" style={{ 'display':'flex', 'alignItems':'center', 'background':'gray', 'margin':'20px 100px'}}>
          <div className="v-mid pl3 w-100 f4" style={{ 'textAlign':'center', 'margin': '0px 50px'}}>
            <p className="lh-copy">Name      :      {user.name}</p>
            <p className="lh-copy">Email     :      {user.email}</p>
            <p className="lh-copy">Branch    :      {user.branch}</p>
            <p className="lh-copy">Semester  :      {user.semester}</p>
          </div>
        </div>
      </div>
    );
}

export default Profile;