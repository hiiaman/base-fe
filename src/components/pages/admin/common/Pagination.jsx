import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { AuthenticatedRequest } from '../../../../services/api';
import '../../../../styles/components/client-detail.css';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const InfoPanigation = styled.p`
  font-size: 12px;
  color: #757575;
  text-align: left;
  float: left;
  witdh: 300px;
`;

const PanigationNav = styled.nav`
  display: block;
`;

const Panigation = styled.ul`
  margin: 0;
  float: right;
`;

const PageItem = styled.li`
 
`;

const PageLink = styled.a`
  color: #757575 !important;
   &:hover {
    background-color: #28C6BB !important;
    border-color: #28C6BB !important;
    color: #FFFFFF !important;
   }
`;

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

class Pagination extends Component {
  gotoPage(url) {
    const { onPageChanged = f => f } = this.props;
    const data = this.fetchData(url);
    onPageChanged(data);
  }

  fetchData(url) {
    const { user, params } = this.props;
    return AuthenticatedRequest(user.access_token)
      .get(url, params)
      .then(result => result.data);
  }

  handleClick(evt) {
    evt.preventDefault();
    this.gotoPage(evt.currentTarget.dataset.url);
  }

  fetchPageNumbers() {
    const { totalPages, pageNeighbours, currentPage } = this.props;
    const totalBlocks = pageNeighbours + 3;
    const current = Math.max(0, Math.min(currentPage, totalPages));
    if (totalPages > totalBlocks) {
      let pages = [];
      const leftBound = current - pageNeighbours < 0 ? 1 : current - pageNeighbours;
      const rightBound = current + pageNeighbours < totalBlocks ? totalBlocks : current + pageNeighbours;
      const beforeLastPage = totalPages;
      const startPage = leftBound >= pageNeighbours ? leftBound : 1;
      const endPage = rightBound >= beforeLastPage ? beforeLastPage : rightBound;
      pages = range(startPage, endPage);
      const leftSpillPage = LEFT_PAGE;
      const rightSpillPage = RIGHT_PAGE;
      
      return [leftSpillPage, ...pages, rightSpillPage];
    }

    return range(1, totalPages);
  }

  render() {
    const { totalRecords, totalPages, currentPage, url, formRecord, toRecord } = this.props;
  
    const pages = this.fetchPageNumbers();

    return (
      <div className="col-md-12">
        <div className="row">
          <PanigationNav>
            <InfoPanigation>
              Showing {formRecord || 0} to {toRecord} of {totalRecords} entries
            </InfoPanigation>
            <Panigation className="pagination">
              {pages.map((page) => {
                if (page === LEFT_PAGE) {
                  return (
                    <PageItem key={page.toString()} className="page-item">
                      <PageLink
                        className="page-link"
                        href={`${url}?page=1`}
                        aria-label="Previous"
                        data-url={`${url}?page=1`}
                        onClick={e => this.handleClick(e)}
                      >
                        <span aria-hidden="true">&lt;</span>
                        <span className="sr-only">Previous</span>
                      </PageLink>
                    </PageItem>
                  );
                }

                if (page === RIGHT_PAGE) {
                  return (
                    <PageItem key={page.toString()} className="page-item">
                      <PageLink
                        className="page-link"
                        href={`${url}?page=${totalPages}`}
                        data-url={`${url}?page=${totalPages}`}
                        aria-label="Next"
                        onClick={e => this.handleClick(e)}
                      >
                        <span aria-hidden="true">&gt;</span>
                        <span className="sr-only">Next</span>
                      </PageLink>
                    </PageItem>
                  );
                }

                return (
                  <PageItem
                    key={page.toString()}
                    className={`page-item${
                      currentPage === page ? ' active' : ''
                    }`}
                  >
                    <PageLink
                      className="page-link"
                      href={`${url}?page=${page}`}
                      data-url={`${url}?page=${page}`}
                      onClick={e => this.handleClick(e)}
                    >
                      {page}
                    </PageLink>
                  </PageItem>
                );
              })}
            </Panigation>
          </PanigationNav>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authenticationReducer;
  return {
    user
  };
}

const connectedApp = connect(mapStateToProps)(Pagination);
export { connectedApp as Pagination };
