
import classes from "../../accets/styles/components/UI/tbl.module.scss";
import classNames from 'classnames';
import { Table } from "react-bootstrap";
import { PropsTable } from "../../services/typing/interfaces/components/UI/tbl.interfaces";


const Tbl:React.FC<PropsTable> = ({data, totalStyle, headStyle, bodyStyle}): any => {

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
        headColor,
        headHorizontallyAlign
    } = headStyle

    const {
        bodyHorizontallyAlign
    } = bodyStyle

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
                {data.head.map((item, i) => 
                    <tr className={classes.main__head__tr} key={i}>
                        {item.list.map(text => 
                            <th 
                                className={classes.main__head__tr__th} 
                                style={{
                                    backgroundColor: headBColor ?? "#EFF5FF",
                                    color: headColor ?? "#696784",
                                    textAlign: headHorizontallyAlign ?? 'start'
                                }}
                            >{text}</th>
                        )}
                    </tr>
                )}
            </thead>
            <tbody className={classes.main__body}>
                {data.filter ?
                    <tr className={classes.main__body__tr}>
                        {data.filter.list.map((text: any, i) => <td 
                            className={classes.main__body__tr__td}
                            style={{
                                textAlign: bodyHorizontallyAlign ?? 'center',
                            }}
                            key={i}
                        >{text}</td>)}
                    </tr> : <></>
                }
                {data.body.map((item, i) => 
                    <tr className={classes.main__body__tr} key={i}>
                        {item.list.map((text: any, i) => 
                            <td 
                                className={classes.main__body__tr__td}
                                style={{
                                    textAlign: bodyHorizontallyAlign ?? 'start',
                                }}
                                key={i}
                            >{text}</td>
                        )}
                    </tr>
                )}
            </tbody>
        </Table>
    )
}

export default Tbl