import React, { Component } from 'react'
import { Carousel, Figure } from 'react-bootstrap';
import logo1 from '../../img/logo1.jpg';
import logo2 from '../../img/logo2.jpg';
import logo3 from '../../img/logo3.jpg';

class Main extends Component {

    constructor(props) {
        super(props);
        console.log('This is Main');
    }
    render() {
        return (
            <div>
                <Carousel>
                    <Carousel.Item>

                        <Figure>
                            <Figure.Image
                                width={1200}
                                height={300}
                              
                                src={logo1}
                            />
                            </Figure>
                           
                            <Carousel.Caption>
                                <h3>Вкус настоящего хлеба</h3>
                                <p>Всегда в наличии свежий нутальный дрожжевой и бездрожеввой хлеб</p>
                            </Carousel.Caption>
                    </Carousel.Item>
                        <Carousel.Item>
                        <Figure.Image
                                width={1200}
                                height={300}
                                alt="171x180"
                                src={logo2}
                            />

                            <Carousel.Caption>
                                <h3>Пироги и домашняя выпечка</h3>
                                <p>Почуствуйте вкус дома с нашими пирогами и пирожками</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                        <Figure.Image
                                width={1200}
                                height={300}
                                alt="171x180"
                                src={logo3}
                            />

                            <Carousel.Caption>
                                <h3>Национальные традиции</h3>
                                <p>Закажите самсу,баурсаки,учпочмак чтобы прикоснуться к восточной выпечки </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                </Carousel>

                    <p>«Первая Пекарня» — уютная, семейная пекарня — кафе — кондитерская в северо-западном районе г. Байконуре.</p>

                    <p>Идея первой пекарни — производство свежей, натуральной продукции из экологичных продуктов. В производстве нашей продукции мы сознательно отказались от пищевых улучшителей, разрыхлителей, сухих дрожжей, маргарина и пальмового масла, консервантов, заменителей молока, яйца и пр. в пользу вашего здоровья.</p>

                    <p>Продегустировать нашу продукцию Вы всегда можете ежедневно по адресу: пр. М. Мира 10Б (СЗР, возле магазина «Сказка»)</p>

            </div>
                );
            }
        
        }
export default Main;