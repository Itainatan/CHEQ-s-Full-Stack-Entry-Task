import React from "react";
import { SquareHedear } from "../styles/utils"

const titles = ['Id', 'Vast url', 'Position', 'Width', 'Height', 'Buttons'];

const Head = () =>
    <tbody>
        <tr>
            {
                titles.map((value, index) =>
                    <SquareHedear key={index}>{value}</SquareHedear>
                )
            }
        </tr>
    </tbody>

export default Head;