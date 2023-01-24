import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import {useEffect, useState} from "react";

function App() {

    const [areaWidth, setAreaWidth] = useState(0) // ft
    const [areaHeight, setAreaHeight] = useState(0) // ft
    const [areaPercent, setAreaPercent] = useState(10) // 10% addition

    const [resultArea, setResultArea] = useState(0) // ft^2

    const [tilesWidth, setTilesWidth] = useState(0) // in
    const [tilesHeight, setTilesHeight] = useState(0)
    const [resultAmount, setResultAmount] = useState(0)

    const [select, setSelect] = useState('')
    const [pricePiece, setPricePiece] = useState(0)
    const [totalPricePiece, setTotalPricePiece] = useState('0')

    const [priceBox, setPriceBox] = useState(0)
    const [tilesInBox, setTilesInBox] = useState(0)
    const [boxQuantity, setBoxQuantity] = useState(0)
    const [totalPriceBox, setTotalPriceBox] = useState('0')

    const [modal, setModal] = useState(false)

    const toggle = () => {
        setModal(!modal)
    }

    const calculateArea = () => {
        const initialArea = (areaWidth * areaHeight) * 144
        const percentArea = initialArea / 100 * areaPercent
        setResultArea(Math.ceil(initialArea + percentArea))
    }
    const calculateAmount = () => {
        const tileSquare = tilesWidth * tilesHeight
        setResultAmount(Math.ceil(resultArea / tileSquare))
    }

    const calculateBox = () => {
        setBoxQuantity(Math.ceil(resultAmount / tilesInBox))
    }

    const calculateTotalPricePiece = () => {
        if (select === 'Piece') {
            const total = resultAmount * pricePiece
            setTotalPricePiece(total.toFixed(2))
        } else {
            setPricePiece(0)
            setTotalPricePiece('0')
        }
    }

    const calculateTotalPriceBox = () => {
        if (select === 'Box') {
            const total = boxQuantity * priceBox
            setTotalPriceBox(total.toFixed(2))
        } else {
            setPriceBox(0)
            setTotalPriceBox('0')
            setTilesInBox(0)
        }
    }

    useEffect(() => {
        calculateArea();
        calculateAmount();
        calculateTotalPricePiece();
        calculateBox()
        calculateTotalPriceBox()
    }, [areaWidth, areaHeight, areaPercent, resultArea, tilesWidth, tilesHeight,
        resultAmount, select, pricePiece, totalPricePiece, boxQuantity, tilesInBox, totalPriceBox]);

    return (
        <div className="container">
            <h1>Tiles calculator</h1>
            <Form>
                <Row className="row">
                    <Col className="col-md-4">
                        <FormGroup>
                            <Label> Area Width, ft </Label>
                            <Input min='0' type="number" value={areaWidth} onChange={e => {
                                setAreaWidth(e.target.value)
                                calculateArea()
                            }}/>
                        </FormGroup>
                    </Col>
                    <Col className="col-md-4">
                        <FormGroup>
                            <Label> Area Height, ft </Label>
                            <Input min='0' type="number" value={areaHeight} onChange={e => {
                                setAreaHeight(e.target.value)
                                calculateArea()
                            }}/>
                        </FormGroup>
                    </Col>
                    <Col className="col-md-4">
                        <FormGroup>
                            <Label> Area Addition Percent </Label>
                            <Input min='0' type="number" value={areaPercent} onChange={e => {
                                setAreaPercent(e.target.value)
                                calculateArea()
                            }}/>
                        </FormGroup>
                    </Col>
                </Row>
            </Form>

            <Form>
                <Row className="row mt-5">
                    <Col className="col-md-3">
                        <FormGroup>
                            <Label> Tiles Width, ft </Label>
                            <Input min='0' type="number"
                                   value={tilesWidth} onChange={e => {
                                setTilesWidth(e.target.value)
                                calculateAmount()
                            }}/>
                        </FormGroup>
                    </Col>
                    <Col className="col-md-3">
                        <FormGroup>
                            <Label> Tiles Height, ft </Label>
                            <Input min='0' type="number"
                                   value={tilesHeight} onChange={e => {
                                setTilesHeight(e.target.value)
                                calculateAmount()
                            }}/>
                        </FormGroup>
                    </Col>
                    <Col className="col-md-3">
                        <FormGroup>
                            <Label> Sell Options </Label>
                            <Input value={select} onChange={e => {
                                setSelect(e.target.value)
                                toggle()
                            }}
                                   name="select" type="select">
                                <option>Piece</option>
                                <option>Box</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    {!modal &&
                        <Col className="col-md-3">
                            <FormGroup>
                                <Label>Price per piece</Label>
                                <Input value={pricePiece} onChange={e => {
                                    setPricePiece(e.target.value)
                                    calculateTotalPricePiece()
                                }}
                                       min='0' type="number"/>
                            </FormGroup>
                        </Col>
                    }
                    {modal &&
                        <Col className="col-md-3">
                            <FormGroup>
                                <Label>Price per box</Label>
                                <Input value={priceBox} onChange={e => {
                                    setPriceBox(e.target.value)
                                    calculateTotalPriceBox()
                                }}
                                       min='0' type="number"/>
                            </FormGroup>
                        </Col>
                    }
                </Row>
                {modal &&
                    <Row className="row mt-5">
                        <Col className="col-md-3">
                            <FormGroup>
                                <Label>Tiles in Box </Label>
                                <Input value={tilesInBox} onChange={e => {
                                    setTilesInBox(e.target.value)
                                    calculateBox()
                                    calculateTotalPriceBox()
                                }}
                                       min='0' type="number"/>

                            </FormGroup>
                        </Col>
                    </Row>
                }
            </Form>
            {!modal &&
                <>
                    <h5>Area: {resultArea} sq in</h5>
                    <h5>Tiles Amount: {resultAmount}</h5>
                    <h5>Total Price: {totalPricePiece}</h5>
                </>
            }
            {modal &&
                <>
                    <h5>Area: {resultArea} sq in</h5>
                    <h5>Tiles Amount: {resultAmount}</h5>
                    <h5>Box Quantity: {boxQuantity}</h5>
                    <h5>Total Price: {totalPriceBox}</h5>
                </>
            }
        </div>
    );
}

export default App;
