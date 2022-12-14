import { useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';

import { useAuth } from '../../../context/AuthProvider';
import { useHelpers } from '../../../context/HelperProvider';
import Links from './links';
import { useApi } from 'context/ApiProvider';

const Component = () => {
  const _header = useRef(null);

  const { currentUser } = useAuth();
  const { showAlert } = useHelpers();
  const { auth } = useApi();

  const updatePostion = useCallback(() => {
    if (!window || !_header.current) {
      return;
    }

    const top =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    _header.current.className = top > 0 ? 'desktop floating' : 'desktop';
  }, [_header]);

  useEffect(() => {
    if (!window) {
      return;
    }

    window.addEventListener('scroll', updatePostion);

    return () => {
      window.removeEventListener('scroll', updatePostion);
    };
  }, [updatePostion]);

  const clickSignOut = useCallback(async () => {
    await auth.logout();

    showAlert('Logged out', true);
  }, [showAlert]);

  const renderLinks = useCallback(
    () => (
      <div className="right-menu">
        {currentUser ? (
          <div className="profile-block">
            <Link href="/settings">
              <a className="settings-btn" />
            </Link>
            <Link href="/profile">
              <a className="avatar" />
            </Link>
            <Link href="/profile">
              <a className="name">{currentUser.displayName}</a>
            </Link>
            <button type="button" className="logout-btn" onClick={clickSignOut}>
              Sign Out
            </button>
          </div>
        ) : (
          <>
            <Link href="/auth/signup">
              <a>Sign Up</a>
            </Link>
            <span>|</span>
            <Link href="/auth/login">
              <a>Login</a>
            </Link>
          </>
        )}
      </div>
    ),
    [clickSignOut, currentUser]
  );

  return (
    <header ref={_header} className="desktop">
      <div className="content">
        <Link href="/">
          <a className="logo-link" />
        </Link>
        <div className="left-menu">
          <Links />
        </div>
        {renderLinks()}
      </div>
    </header>
  );
};

export default Component;
