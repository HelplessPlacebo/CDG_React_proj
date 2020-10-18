import React, {useState} from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {TAddIssue, TChangeIssue, TDeleteIssue, TSetCompletedIssues, TSetIssues} from "../../Data/IssuesReducer";
import IssuesList from "./IssuesList";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingTop: "4%",
            paddingLeft: "6%",
        },
        cardHeader: {
            padding: theme.spacing(1, 2),
        },
        list: {

            width: window.innerWidth < 600 ? 300
                : window.innerWidth < 900 ? 500
                        :window.innerWidth < 1610 ? 600
                        :window.innerWidth < 1800 ? 700
                            : 800,
            height : window.innerWidth < 600 ? 250
                : window.innerWidth < 900 ? 400
                    :window.innerWidth < 1200 ? 500
                        :window.innerWidth < 1800 ? 650
                            : 800
            ,
            backgroundColor: theme.palette.background.paper,
            overflow: 'auto',
        },
        button: {
            color: "#fdfffb",
            margin: theme.spacing(0.5, 0),
        },
        AddIssueInput: {
            '& .MuiTextField-root': {
                margin: theme.spacing(0),
                width: window.innerWidth < 900 ? '15ch' : window.innerWidth < 1400 ? "25ch" : window.innerWidth < 1650
                    ? "30ch" : "45ch"
            },
            paddingLeft: "30%",
            paddingBottom: "10px"
        }
    }),
)

function not(a: string[], b: string[]) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: string[], b: string[]) {
    return a.filter((value) => b.indexOf(value) !== -1);
}


export type TIssuesProps = {
    Issues: Array<string>
    CompletedIssues: Array<string>
    AddIssue: TAddIssue
    DeleteIssue: TDeleteIssue
    ChangeIssue: TChangeIssue
    SetIssues : TSetIssues
    SetCompletedIssues : TSetCompletedIssues
}


const Issues: React.FC<TIssuesProps> = (props) => {
    const classes = useStyles();
    const [checked, setChecked] = useState<string[]>([]);

    const IssuesChecked = intersection(checked, props.Issues);
    const CompletedIssuesChecked = intersection(checked, props.CompletedIssues);



    const handleCheckedIssues = () => {
        props.SetCompletedIssues(props.CompletedIssues.concat(IssuesChecked));
        props.SetIssues(not(props.Issues, IssuesChecked));
        setChecked(not(checked, IssuesChecked));
    }

    const handleCheckedCompletedIssues = () => {
        props.SetIssues(props.Issues.concat(CompletedIssuesChecked));
        props.SetCompletedIssues(not(props.CompletedIssues, CompletedIssuesChecked));
        setChecked(not(checked, CompletedIssuesChecked));
    }

    return (
        <div >
            <Grid container spacing={2} alignItems="center" className={classes.root}>
                <Grid item>
                    <IssuesList title={"Issues"} items={props.Issues}
                                el={"Issue"} classes={classes}
                                DeleteIssue={props.DeleteIssue} AddIssue={props.AddIssue}
                                checked={checked} setChecked={setChecked}
                                ChangeIssue={props.ChangeIssue}
                    />
                </Grid>
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
                <Grid item>
                    <IssuesList title={"Completed Issues"} items={props.CompletedIssues}
                                el={"CompletedIssue"} setChecked={setChecked}
                                checked={checked} AddIssue={props.AddIssue}
                                DeleteIssue={props.DeleteIssue} classes={classes}
                                ChangeIssue={props.ChangeIssue}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default Issues