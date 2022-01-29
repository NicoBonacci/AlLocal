import * as React from "react";

import Home from "../Pages/home";
import CambioPassword from "../Pages/cambioPassword";
import EditBioAzienda from "../Pages/editBioAzienda";
import EditProdotto from "../Pages/editProdotto";
import PicUpdate from "../Pages/picUpdate";


import renderer from "react-test-renderer";

it(`renders correctly`, () => {
    const tree = renderer.create(<Home />);
    expect(tree).toMatchSnapshot();
});

it(`renders correctly`, () => {
    const tree = renderer.create(<CambioPassword />);
    expect(tree).toMatchSnapshot();
});

it(`renders correctly`, () => {
    const tree = renderer.create(<EditBioAzienda />);
    expect(tree).toMatchSnapshot();
});

it(`renders correctly`, () => {
    const tree = renderer.create(<EditProdotto />);
    expect(tree).toMatchSnapshot();
});

it(`renders correctly`, () => {
    const tree = renderer.create(<PicUpdate />);
    expect(tree).toMatchSnapshot();
});

