import MediaStreamRecorder from 'msr';
import * as React from "react";

interface IProps {
    memes: any[],
    selectNewMeme: any,
    searchByTag: any
}

export default class MemeList extends React.Component<IProps, {}> {
    constructor(props: any) {
        super(props)   
        this.searchByTag = this.searchByTag.bind(this)
        this.searchTagByVoice = this.searchTagByVoice.bind(this)
    }

	public render() {
		return (
			<div className="container meme-list-wrapper">
                <div className="row meme-list-heading">
                    <div className="input-group">
                        <input type="text" id="search-tag-textbox" className="form-control" placeholder="Search By Tags" />
                        <div className="input-group-append">
                            <div className="btn" onClick={this.searchTagByVoice}><i className="fa fa-microphone" /></div>
                            <div className="btn btn-outline-secondary search-button" onClick = {this.searchByTag}>Search</div>
                        </div>
                    </div>  
                </div>
                <div className="row meme-list-table">
                    <table className="table table-striped">
                        <tbody>
                            {this.createTable()}
                        </tbody>
                    </table>
                </div>
            </div>
		);
    }

    // Construct table using meme list
	private createTable() {
        const table:any[] = []
        const memeList = this.props.memes
        if (memeList == null) {
            return table
        }

        for (let i = 0; i < memeList.length; i++) {
            const children = []
            const meme = memeList[i]
            children.push(<td key={"id" + i}>{meme.id}</td>)
            children.push(<td key={"name" + i}>{meme.title}</td>)
            children.push(<td key={"tags" + i}>{meme.tags}</td>)
            table.push(<tr key={i+""} id={i+""} onClick= {this.selectRow.bind(this, i)}>{children}</tr>)
        }
        return table
    }
    
    // Meme selection handler to display selected meme in details component
    private selectRow(index: any) {
        const selectedMeme = this.props.memes[index]
        if (selectedMeme != null) {
            this.props.selectNewMeme(selectedMeme)
        }
    }

    // Search meme by tag
    private searchByTag() {
        const textBox = document.getElementById("search-tag-textbox") as HTMLInputElement
        if (textBox === null) {
            return;
        }
        const tag = textBox.value 
        this.props.searchByTag(tag)  
    }

    private searchTagByVoice(){
        const mediaConstraints = {
            audio: true
        }
        const onMediaSuccess = (stream: any) => {
            const mediaRecorder = new MediaStreamRecorder(stream);
            mediaRecorder.mimeType = 'audio/wav'; // check this line for audio/wav
            mediaRecorder.ondataavailable = (blob: any) => {
                this.postAudio(blob);
                mediaRecorder.stop()
            }
            mediaRecorder.start(3000);
        }
    
        navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError)
    
        function onMediaError(e: any) {
            console.error('media error', e);
        }
    
    }
    private postAudio(blob:any) {
        let accessToken: any;
        fetch('https://westus.api.cognitive.microsoft.com/sts/v1.0/issueToken', {
            headers: {
                'Content-Length': '0',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Ocp-Apim-Subscription-Key': 'd540f77acd43487ea1cda63823d67cc9'
            },
            method: 'POST'
        }).then((response) => {
            // console.log(response.text())
            return response.text()
        }).then((response) => {
            console.log(response)
            accessToken = response
        }).catch((error) => {
            console.log("Error", error)
        });
            // posting audio
    fetch('https://westus.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US', {
        body: blob, // this is a .wav audio file    
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer' + accessToken,
            'Content-Type': 'audio/wav;codec=audio/pcm; samplerate=16000',
            'Ocp-Apim-Subscription-Key': 'd540f77acd43487ea1cda63823d67cc9'
        },    
        method: 'POST'
    }).then((res) => {
        return res.json()
    }).then((res: any) => {
        console.log(res)
        const textBox = document.getElementById("search-tag-textbox") as HTMLInputElement
        textBox.value = (res.DisplayText as string).slice(0, -1)
    }).catch((error) => {
        console.log("Error", error)
    });

    }

}