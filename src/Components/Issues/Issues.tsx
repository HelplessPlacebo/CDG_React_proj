import React, { useState} from 'react'
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import {TAddIssue, TChangeIssue, TDeleteIssue, TSetCompletedIssues, TSetIssues} from "../../Data/IssuesReducer"
import IssuesList from "./IssuesLists/IssuesList"
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingTop : "2rem"
            // position: "absolute",
            // top : "4rem",
            // left: 0,
            // bottom : "4rem",
            // width: "100%",
        },
        list: {
            // width: "100%%",
            // height : "100%%",
            backgroundColor: theme.palette.background.paper,
            boxShadow : "0px 2px 10px rgba(0,0,0,0.5)"
        },
        button: {
            color: "#fdfffb",
            margin: theme.spacing(0.5, 0),
        }
    })
)

const not = (a: string[], b: string[]) => {
    return a.filter((value) => b.indexOf(value) === -1);
}

const intersection = (a: string[], b: string[]) => {
    return a.filter((value) => b.indexOf(value) !== -1);
}


export type TIssuesProps = {
    Issues: Array<string>
    CompletedIssues: Array<string>
    AddIssue: TAddIssue
    DeleteIssue: TDeleteIssue
    ChangeIssue: TChangeIssue
    SetIssues: TSetIssues
    SetCompletedIssues: TSetCompletedIssues
}


const Issues: React.FC<TIssuesProps> = (props) => {
    const classes = useStyles()
    const [checked, setChecked] = useState<string[]>([])


    const IssuesChecked = intersection(checked, props.Issues);
    const CompletedIssuesChecked = intersection(checked, props.CompletedIssues);


    const handleCheckedIssues = () => {
        props.SetCompletedIssues(props.CompletedIssues.concat(IssuesChecked))
        props.SetIssues(not(props.Issues, IssuesChecked))
        setChecked(not(checked, IssuesChecked))
    }

    const handleCheckedCompletedIssues = () => {
        props.SetIssues(props.Issues.concat(CompletedIssuesChecked))
        props.SetCompletedIssues(not(props.CompletedIssues, CompletedIssuesChecked))
        setChecked(not(checked, CompletedIssuesChecked))
    }

    return (
        <Grid container spacing={3} alignItems="center" justify="center" className={classes.root} >

            <Container style={{margin : 0}}  maxWidth="xl">
                <Grid  item className={classes.list}>
                    <IssuesList title={"Issues"} items={props.Issues}
                                el={"Issue"}
                                DeleteIssue={props.DeleteIssue} AddIssue={props.AddIssue}
                                checked={checked} setChecked={setChecked}
                                ChangeIssue={props.ChangeIssue}
                    />
                </Grid>
                </Container>

            <Grid item>
                <Grid container direction="column" alignItems="center">
                    <Button
                        variant="contained"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedIssues}
                        disabled={IssuesChecked.length === 0}
                        aria-label="move selected right"
                        color={"secondary"}
                    >
                        &gt;
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedCompletedIssues}
                        disabled={CompletedIssuesChecked.length === 0}
                        aria-label="move selected left"
                        color={"primary"}
                    >
                        &lt;
                    </Button>
                </Grid>
            </Grid>

                    <Container style={{margin : 0,paddingBottom : "2rem"}} maxWidth="xl" >
            <Grid  item className={classes.list}>
                <IssuesList title={"Completed Issues"} items={props.CompletedIssues}
                            el={"CompletedIssue"} setChecked={setChecked}
                            checked={checked} AddIssue={props.AddIssue}
                            DeleteIssue={props.DeleteIssue}
                            ChangeIssue={props.ChangeIssue}
                />
            </Grid>
                    </Container>
        </Grid>
    )
}

export default Issues