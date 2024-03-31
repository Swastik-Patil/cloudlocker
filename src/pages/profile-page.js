import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";

export const ProfilePage = () => {
  const { user } = useAuth0();

  return (
    <PageLayout>
      <div className="content-layout">
        <div className="content__body">
          {user.email_verified ? (
            <div className="content__body">
              <div className="profile-grid">
                <div className="profile__header">
                  <img
                    src={user.picture}
                    alt="Profile"
                    className="profile__avatar"
                  />
                  <div className="profile__headline">
                    <h2 className="profile__title">{user.name}</h2>
                    <span className="profile__description">{user.email}</span>
                  </div>
                </div>
                <div className="profile__details">
                  <CodeSnippet
                    title="User Details"
                    code={JSON.stringify(user, null, 2)}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="profile__details">
              <CodeSnippet
                title="Email Verification Required"
                code={
                  "Please verify your email to access your profile details.\n" +
                  "Check your email for a verification link. "
                }
              />
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};
