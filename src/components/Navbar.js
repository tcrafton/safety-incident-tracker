import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { links } from '../utils/constants';

const Navbar = () => {
  return (
    <Wrapper>
      <div className="nav-center">
        <div className="nav-header">
          <h3 className="heading">Safety Incident Tracker</h3>
        </div>
        <ul className="nav-links">
          {links.map((link) => {
            const { id, text, url } = link;
            return (
              <li key={id}>
                <Link to={url}>{text}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;

  font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', sans-serif;

  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%),
    0 1px 5px 0 rgb(0 0 0 / 20%);

  -webkit-box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%),
    0 3px 1px -2px rgb(0 0 0 / 12%), 0 1px 5px 0 rgb(0 0 0 / 20%);

  .heading {
    color: black;
    padding-bottom: 2rem;
    font-weight: 400;
    font-size: 30px;
    font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
      'Helvetica Neue', sans-serif;
    letter-spacing: 1.5px;
    line-height: 30px;
    margin-block-end: 11.25px;
    margin-block-start: 29.29px;
    margin-bottom: 11.25px;
    margin-inline-end: 0px;
    margin-inline-start: 0px;
    margin-left: 0px;
    margin-right: 0px;
    margin-top: 29.29px;
    padding-bottom: 30px;
  }

  .logo {
    transform: scale(0.5);
    margin-bottom: 2px;
  }

  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 175px;
      margin-left: -15px;
    }
  }
  .nav-toggle {
    background: transparent;
    border: transparent;
    color: var(--clr-primary-5);
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  }
  .nav-links {
    display: none;
  }

  .nav ul a {
    display: block;
  }
  @media (min-width: 992px) {
    .nav-toggle {
      display: none;
    }
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
    }
    .nav-links {
      display: flex;
      justify-content: center;
      li {
        margin: 0 0.5rem;
      }
      a {
        color: var(--clr-grey-3);
        font-size: 1rem;
        text-transform: capitalize;
        letter-spacing: var(--spacing);
        padding: 0.5rem;
        &:hover {
          border-bottom: 2px solid var(--clr-grey-1);
        }
      }
    }
  }
`;
export default Navbar;
