import React, { useEffect, useState } from 'react';

import { Row, Col } from 'react-bootstrap';

import { Chart } from 'primereact/chart';

import * as API_CONST from '../constants/api-constants';

const DashboardComponent = () => {

    const [bookCountByCat, updateBookCountByCat] = useState([]);
    const [topRatedBook, updateTopRatedBook] = useState([]);

    useEffect(() => {
        async function init() {
            const bookCountRes = await (await fetch(API_CONST.BOOK_COUNT_BY_CATEGORY)).json();
            let dataSet = {
                labels: [],
                data: []
            }
            for (let cat of bookCountRes) {
                dataSet.labels.push(cat.name);
                dataSet.data.push(cat.bookCount);
            }
            updateBookCountByCat(dataSet);

            let query = API_CONST.BOOK_LIST;
            query = query.replace('[columnName]', 'ratings');
            query = query.replace('[sortOrder]', 'desc');
            const topRatedBookRes = await (await fetch(query)).json();
            let dataSet2 = {
                labels: [],
                data: []
            }
            for (let [index, tbook] of topRatedBookRes.entries()) {
                if (index === 5) {
                    break;
                }
                dataSet2.labels.push(tbook.title);
                dataSet2.data.push(tbook.ratings);
            }
            updateTopRatedBook(dataSet2);
        }
        init();
    }, []);


    const bookCountChart = {
        labels: bookCountByCat.labels,
        datasets: [
            {
                label: 'Book Count',
                data: bookCountByCat.data,
                borderColor: '#66BB6A',
                backgroundColor: 'rgba(100,167,38,0.2)',
                fill: true
            },
        ]
    };
    const topRatingChart = {
        labels: topRatedBook.labels,
        datasets: [
            {
                label: 'Ratings',
                data: topRatedBook.data,
                borderColor: '#42A5F5',
                backgroundColor: [
                    '#EC407A',
                    '#AB47BC',
                    '#42A5F5',
                    '#7E57C2',
                    '#66BB6A',
                    '#FFCA28',
                    '#26A69A'
                ],
                fill: true
            }]
    };

    const options = {
        maintainAspectRatio: false,
        aspectRatio: .8,
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            }
        }
    }

    const barOptions = {
        maintainAspectRatio: false,
        aspectRatio: .8,
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            }
        }
    }
    return (
        <div>
            <Row>
                <Col lg={5}>
                    <div className="mt-5">
                        <h5 className="pl-5">Number of books in each category</h5>
                        <Chart type="line" data={bookCountChart} options={options} style={{ position: 'relative', width: '100%' }} />
                    </div>
                </Col>
                <Col lg={7}>
                    <div className="mt-5">
                        <h5 className="pl-5">Top Rated Books</h5>
                        <Chart type="bar" data={topRatingChart} options={barOptions} style={{ position: 'relative', width: '100%' }} />
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default DashboardComponent;