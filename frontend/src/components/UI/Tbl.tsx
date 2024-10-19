
import classes from "../../accets/styles/components/UI/tbl.module.scss";
import classNames from 'classnames';
import { Table } from "react-bootstrap";
import { PropsTable } from "../../services/typing/interfaces/components/UI/tbl.interfaces";


const Tbl:React.FC<PropsTable> = ({data, totalStyle, headStyle}): any => {

    const {bsPrefix,
        striped,
        bordered,
        borderless,
        hover,
        size,
        variant,
        responsive
    } = totalStyle;

    const {
        headBColor,
        headColor
    } = headStyle

    return (
        <Table 
            bsPrefix={bsPrefix}
            striped={striped}
            bordered={bordered}
            borderless={borderless}
            hover={hover}
            size={size}
            variant={variant}
            responsive={responsive}
            className={classes.main}
        >
            <thead className={classes.main__head}>
                {data.head.map(item => 
                    <tr className={classes.main__head__tr}>
                        {item.list.map(text => 
                            <th 
                                className={classes.main__head__tr__th} 
                                style={{
                                    backgroundColor: headBColor ?? "#EFF5FF",
                                    color: headColor ?? "#696784"
                                }}
                            >{text}</th>
                        )}
                    </tr>
                )}
            </thead>
            <tbody className={classes.main__body}>
                {data.body.map(item => 
                    <tr className={classes.main__body__tr} style={{backgroundColor: "red"}}>
                        {item.list.map((text: any) => 
                            <td className={classes.main__body__tr__td}>{text}</td>
                        )}
                    </tr>
                )}
            </tbody>
        </Table>
    )
}

export default Tbl