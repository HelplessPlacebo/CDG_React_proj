import React, {useState} from 'react'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import {AddIssue, ChangeIssue, DeleteIssue, SetCompletedIssues, SetIssues} from "../../Redux/IssuesReducer"
import {IssuesList} from "./IssuesList/IssuesList"
import Container from '@material-ui/core/Container';
import {useDispatch, useSelector} from "react-redux";
import {getCompletedIssues, getIssues} from "../../assets/utils/Selectors/IssuesSelectors";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingTop: "2rem"
        },
        list: {
            backgroundColor: theme.palette.background.paper,
            boxShadow: "0px 2px 10px rgba(0,0,0,0.5)"
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


const Issues = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const issues = useSelector(getIssues)
    const completedIssues = useSelector(getCompletedIssues)

    const addIssue = (Issue: string) => dispatch(AddIssue(Issue))
    const deleteIssue = (Issue: string, From: "Issue" | "CompletedIssue") => dispatch(DeleteIssue(Issue, From))
    const changeIssue = (OldIssue: string, NewIssue: string) => dispatch(ChangeIssue(OldIssue, NewIssue))
    const setIssues = (Issues: string[]) => dispatch(SetIssues(Issues))
    const setCompletedIssues = (CompletedIssues: string[]) => dispatch(SetCompletedIssues(CompletedIssues))

    const [checked, setChecked] = useState<string[]>([])
    const IssuesChecked = intersection(checked, issues);
    const CompletedIssuesChecked = intersection(checked, completedIssues);

    const handleCheckedIssues = () => {
        setCompletedIssues(completedIssues.concat(IssuesChecked))
        setIssues(not(issues, IssuesChecked))
        setChecked(not(checked, IssuesChecked))
    }

    const handleCheckedCompletedIssues = () => {
        setIssues(issues.concat(CompletedIssuesChecked))
        setCompletedIssues(not(completedIssues, CompletedIssuesChecked))
        setChecked(not(checked, CompletedIssuesChecked))
    }

    return <Grid container spacing={3} alignItems="center" justify="center" className={classes.root}>

        <Container style={{margin: 0}} maxWidth="xl">
            <Grid item className={classes.list}>
                <IssuesList title={"Issues"} items={issues}
                            el={"Issue"}
                            deleteIssue={deleteIssue} addIssue={addIssue}
                            checked={checked} setChecked={setChecked}
                            changeIssue={changeIssue}
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

        <Container style={{margin: 0, paddingBottom: "2rem"}} maxWidth="xl">
            <Grid item className={classes.list}>
                <IssuesList title={"Completed Issues"} items={completedIssues}
                            el={"CompletedIssue"} setChecked={setChecked}
                            checked={checked} addIssue={addIssue}
                            deleteIssue={deleteIssue}
                            changeIssue={changeIssue}
                />
            </Grid>
        </Container>
    </Grid>
}
export default Issues
