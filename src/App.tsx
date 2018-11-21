// import Button from '@material-ui/core/Button';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';

// import { withStyles } from '@material-ui/core/styles';
// import * as PropTypes from 'prop-types';

import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import * as React from 'react';

import Modal from 'react-responsive-modal';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


import './App.css';

// import MemeDetail from './components/MemeDetail';
// import MemeList from './components/MemeList';

interface IState {
	audio: any,
	audioList: any,
	audioListGen: boolean,
	currentMeme: any,
	editOpen: boolean,
	memes: any[],
	open: boolean,
	uploadFileList: any,
	uploadedBase64: any,
}



class App extends React.Component<{}, IState> {
	constructor(props: any) {
        super(props)
        this.state = {
			audio: {"id":-1, "title":"Loading title","tag":"Loading tags","timestamp":""},
			audioList: ["blank"],
			audioListGen: true,
			currentMeme: {"id":0, "title":"Loading ","url":"","tags":"⚆ _ ⚆","uploaded":"","width":"0","height":"0"},
			editOpen: false,
			memes: [],
			open: false,
			uploadFileList: null,
			uploadedBase64: ""
		}     	

		this.changeAudio = this.changeAudio.bind(this)
		this.selectNewMeme = this.selectNewMeme.bind(this)
		this.fetchMemes = this.fetchMemes.bind(this)
		this.fetchMemes("")	
		this.handleFileUpload = this.handleFileUpload.bind(this)
		this.uploadAudio = this.uploadAudio.bind(this)
		this.getAudioList = this.getAudioList.bind(this)
		this.createTable = this.createTable.bind(this)
		this.getBase64 = this.getBase64.bind(this)
		this.deleteAudio = this.deleteAudio.bind(this)
		this.editAudio = this.editAudio.bind(this)

	}

	public render() {
		/*
		if (this.state.audio === "") {
			this.defaultAudio();
		}*/
		console.log("title is: " + this.state.audio.title)
		console.log("audioList is: " + this.state.audioList)
		/*
		if (this.state.audioList === ["blank"]) {
			console.log("i am runnin da function")
			this.getAudioList()
		}
		*/
		if (this.state.audioListGen === true) {
			this.getAudioList()
			this.setState({
				audioListGen: false
			})
		}
		const { open, editOpen } = this.state;
		return (
		<div>
			<div className="header-wrapper">
			Audiocat 🐱
			<div className="container header" style={{marginRight:"50%"}}>
					{/*<div className="btn btn-primary btn-action btn-add" onClick={this.changeAudio}>Title change</div>*/}
					{/*<div className="btn btn-primary btn-action btn-add" onClick={this.printAudio}>print title</div>*/}

				</div>
				
				<div className="container header">
					<div className="btn btn-primary btn-action btn-add" onClick={this.onOpenModal}>Add Audio</div>
					{/*<div className="btn btn-primary btn-action btn-add" onClick={this.printAudio}>print title</div>*/}

				</div>
			</div>
			{/*
			<div className="container">
				<div className="row">
					<div className="col-7">
						<MemeDetail currentMeme={this.state.currentMeme} />
					</div>
					<div className="col-5">
						<MemeList memes={this.state.memes} selectNewMeme={this.selectNewMeme} searchByTag={this.fetchMemes}/>
					</div>
				</div>
			</div>
			*/}
			
				<Modal open={editOpen} onClose={this.onEditCloseModal}>
				<form>
					Modifying the audio file: {this.state.audio.title}
					<br/>
					<div className="form-group">
						<b><label>Audio Title</label></b>
						<input type="text" className="form-control" id="title-input" placeholder="Enter the new audio title" />
					</div>
					<div className="form-group">
						<b><label>Tag</label></b>
						<input type="text" className="form-control" id="tag-input" placeholder="Enter the new tag" />
					</div>
					<div className="form-group">
						<label>Audio File</label>
						<input type="file" onChange={this.handleFileUpload} className="form-control-file" id="audio-file-input" />
					</div>

					<button type="button" className="btn" onClick={this.editAudio}>Upload</button>
				</form>
			</Modal>

			<Modal open={open} onClose={this.onCloseModal}>
				<form>
					<div className="form-group">
						<label>Audio Title</label>
						<input type="text" className="form-control" id="title-input" placeholder="Enter Title" />
					</div>
					<div className="form-group">
						<label>Tag</label>
						<input type="text" className="form-control" id="tag-input" placeholder="Enter Tag" />
					</div>
					<div className="form-group">
						<label>Audio File</label>
						<input type="file" onChange={this.handleFileUpload} className="form-control-file" id="audio-file-input" />
					</div>

					<button type="button" className="btn" onClick={this.uploadAudio}>Upload</button>
				</form>
			</Modal>
			{/*
			<h1 style={{ textAlign: "center" }}> {this.state.audio.title + "🎵"} </h1>
			<h3 style={{ textAlign: "center" }}> {this.state.audio.tag} </h3>
			*/}



		<Grid item={true} xs={12} style={{paddingTop:"10%"}}>
          <Grid container={true} className={"columns"} justify="center" spacing={8}>
            {[0].map(value => (
              <Grid key={value} item={true}>



			<Paper className={"root"}>
			<Grid container={true} spacing={16}>
			  <Grid item={true}>
				<ButtonBase className={"audio"} /*style={{paddingTop:"50px"}}*/>
				<audio controls={true} /*style={{paddingTop:"10%"}}*/>
							{/* <source src="http://puu.sh/C4d9s/5634f362c7.wav" type="audio/wav"/> */}
							<source src="http://puu.sh/C4d9s/5634f362c7.wav" type="audio/wav"/>

							Your browser does not support the audio tag.
				</audio>				
				</ButtonBase>
			  </Grid>
			  <Grid item={true} xs={12} sm={true} container={true}>
				<Grid item={true} xs={true} container={true} direction="column" spacing={16}>
				  <Grid item={true} xs={true}>
					<Typography gutterBottom={true} variant="subtitle1">
					<b>
						{this.state.audio.title + "🎵"} 
					</b>
					</Typography>
					<Typography gutterBottom={true}>
						{this.state.audio.tag}
					</Typography>
					<Typography color="textSecondary">ID: {this.state.audio.id}</Typography>
				  </Grid>
				  <Grid item={true}>
					<Typography style={{ cursor: 'pointer' }}>Author: me irl</Typography>
				  </Grid>
					<Grid item={true}>
					<ButtonBase className={"audio"}>
						<Button variant="contained" color="secondary" onClick={this.deleteAudio} style={{position:"relative", left:"0", bottom:"0"}}>
						<DeleteIcon />
						</Button>
						<Button variant="contained" color="primary" onClick={this.onEditOpenModal} style={{position:"relative", left:"0", bottom:"0"}}>
						<EditIcon />
						</Button>
						</ButtonBase>
					</Grid>
				</Grid>
				{/*
				<Grid item={true}>
				  <Typography variant="subtitle1">$19.00</Typography>
				</Grid>
				*/}
			  </Grid>
			</Grid>
		  </Paper>


              </Grid>
            ))}
            {[1].map(value => (
              <Grid key={value} item={true}>
                <Paper className={"audioList"} >
								<List>
									{this.createTable()}
{/*
									<ListItem style={{ cursor: 'pointer' }}>
										<ListItemText primary={this.state.audioList.length} secondary="Jan 9, 2014" />
									</ListItem>

									<ListItem style={{ cursor: 'pointer' }} >
										<ListItemText primary={this.state.audioList.length} secondary="Jan 9, 2014" />
									</ListItem>
*/}
								</List>
								</Paper>
								
              </Grid>
            ))}
          </Grid>
        </Grid>
		</div>
		);
	}

	
	// Add Modal open
	private onOpenModal = () => {
		this.setState({ open: true });
	  };
	
	// Add Modal close
	private onCloseModal = () => {
		this.setState({ open: false });
	};

	// Edit modal open
	private onEditOpenModal = () => {
		this.setState({ editOpen: true });
	  };
	
	// Edit modal close
	private onEditCloseModal = () => {
		this.setState({ editOpen: false });
	};
	
	// Change selected meme
	private selectNewMeme(newMeme: any) {
		this.setState({
			currentMeme: newMeme
		})
	}

	private getAudioList() {
		fetch("https://audiocatapi2c.azurewebsites.net/api/Audio").then(d => d.json())
		.then(d => {
			// console.log(d)
			// d.title = "ayy lmao"
			this.setState({
				audioList: d
			})
			console.log(this.state.audioList)	
		})
	}
	private changeAudio() {
		fetch("http://audiocatapi.azurewebsites.net/api/audio/1").then(d => d.json())
		.then(d => {
			// console.log(d)
			// d.title = "ayy lmao"
			this.setState({
				audio: d
			})
			console.log(this.state.audio)
			
		})
	}
	private deleteAudio(){
		const url = "https://audiocatapi2c.azurewebsites.net/api/audio/" + this.state.audio.id
		fetch(url, {
			// body: JSON.stringify(formData),
			headers: {'cache-control': 'no-cache'},
			method: 'DELETE'
		})
		.then((response : any) => {
			if (!response.ok) {
				// Error State
				alert(response.statusText)
			} else {
				alert(this.state.audio.title + "has been removed")
				location.reload()
			}
		})
	}

	private editAudio() {
		const titleInput = document.getElementById("title-input") as HTMLInputElement
		const tagInput = document.getElementById("tag-input") as HTMLInputElement
		// const fileInput = document.getElementById("audio-file-input").files[0] as HTMLInputElement
		const utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
		// const audioFile = this.state.uploadFileList[0]
		let title = ""
		let tag = ""
		 if (titleInput === null) {
		    title = this.state.audio.title
		 }
		 else{
         title = titleInput.value
		 }
		 if (tag === null) {
			tag = this.state.audio.title
	   }
	   else{
		  tag = tagInput.value
		 }
		 
		const formData = {"id": this.state.audio.id, "title":  title , "tag": tag, "timestamp": utc.toString() }
		console.log("title is: " + title)
    console.log("the id isww: " + this.state.audio.id)
		const url = "https://audiocatapi2c.azurewebsites.net/api/audio/" + this.state.audio.id
		fetch(url, {
			body: JSON.stringify(formData),
			headers: {'cache-control': 'no-cache', 'content-type': 'application/json'},
			method: 'PUT'
		})
		.then((response : any) => {
			if (!response.ok) {
				// Error State
				alert(response.statusText)
			} else {
				location.reload()
			}
		})

		}
	
	

	private fetchMemes(tag: any) {
		let url = "http://phase2apitest.azurewebsites.net/api/meme"
		if (tag !== "") {
			url += "/tag?=" + tag
		}
		fetch(url, {
			method: 'GET'
		})
		.then(res => res.json())
		.then(json => {
			let currentMeme = json[0]
			if (currentMeme === undefined) {
				currentMeme = {"id":0, "title":"No memes (╯°□°）╯︵ ┻━┻","url":"","tags":"try a different tag","uploaded":"","width":"0","height":"0"}
			}
			this.setState({
				currentMeme,
				memes: json
			})
		});
	}

	private handleFileUpload(fileList: any) {
		this.setState({
			uploadFileList: fileList.target.files
		})
	}
/*
	private getBase64(file: any) {
    const reader:FileReader = new FileReader();
    reader.onload = (readerEvt: any) => {
      const binaryString = readerEvt.target.result;
      let base64Url = binaryString;
			base64Url = base64Url.substring(base64Url.lastIndexOf("base64") + 7);
			return base64Url
	}
	*/
	private getBase64(file: any) {
		
		const fileReader: FileReader = new FileReader();
		
		fileReader.addEventListener("load", (e) => {
			this.setState({ uploadedBase64: fileReader.result });
		});

/*
	fileReader.onload = (e) => {
		this.setState({ uploadedBase64: fileReader.result });
	}
	*/
	 fileReader.readAsDataURL(file);

	 console.log(this.state.uploadedBase64.split(',')[1])
	 console.log(this.state.uploadedBase64.split(',')[1])
	 return (this.state.uploadedBase64.split(',')[1]) 
			/*
				console.log(tjis.target.result)
		})
*/

	}

	private uploadAudio() {
		const titleInput = document.getElementById("title-input") as HTMLInputElement
		const tagInput = document.getElementById("tag-input") as HTMLInputElement
		// const fileInput = document.getElementById("audio-file-input").files[0] as HTMLInputElement
		const utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
		// const audioFile = this.state.uploadFileList[0]
			
		 if (titleInput === null || tagInput === null) {
			alert("Please fill out the fields")
		 	return;
		 }

		if (this.state.uploadFileList === null) {
			alert("There is no file")
			return;
		}
	
		const title = titleInput.value
		const tag = tagInput.value
		/*
		console.log("title is: " + title)
		console.log("tag is: " + tag)
		console.log("date is: " + utc)
		console.log("file is: " + this.state.uploadFileList[0].name)
		console.log("file type is: " + this.state.uploadFileList[0].type)
		console.log("modified date is: " + this.state.uploadFileList[0].lastModifiedDate)
		const type = this.state.uploadFileList[0].type.substring(0,5)
		console.log("type is: " + type)
		if (type === "audio"){
			console.log("hey this is a valid audio file!")
			console.log("base 64 is")
			const base64 = this.getBase64(this.state.uploadFileList[0])
			console.log(base64)
		}
		*/
		/*
		const formData = new FormData()
		formData.append("title", title.toString())
		formData.append("tag", tag.toString())
		formData.append("timestamp", utc.toString())
		*/
	 	// formData.append("timestamp", utc.toString())
		// console.log("form data is:")
		// console.log(formData)
		
		// const formData = '{"title": ' + title.toString() + ', "tag": ' + tag.toString() + ', "timestamp": ' + utc.toString() + '}'
		const formData = {"title":  title , "tag": tag, "timestamp": utc.toString() }
		// JSON.stringify(formData)
		console.log("title is: " + title)
		// const formData = '{"title": "js bois", "tag": "ok", "timestamp": "idk u"}'

		// const formData = '{"title": ' + title.toString + ', "tag": "ok", "timestamp": "idk u"}'
		const url = "https://audiocatapi2c.azurewebsites.net/api/audio"
		fetch(url, {
			body: JSON.stringify(formData),
			headers: {'cache-control': 'no-cache', 'content-type': 'application/json'},
			method: 'POST'
		})
		.then((response : any) => {
			if (!response.ok) {
				// Error State
				alert(response.statusText)
			} else {
				location.reload()
			}
		})

		}

		private createTable() {
			const table:any[] = []
			console.log(this.state.audioList.length)
			for (let i = 0; i < this.state.audioList.length; i++) {
					const children = []
					const audio = this.state.audioList[i]
					children.push(<td key={"id" + i}>{audio.id}</td>)
					children.push(<td key={"name" + i}>{audio.title}</td>)
					children.push(<td key={"tags" + i}>{audio.tag}</td>)
					const currentAudio = {"id": audio.id, "title": audio.title , "tag": audio.tag, "timestamp": audio.timestamp}
					// table.push(<tr key={i+""} id={i+""} onClick= {this.selectRow.bind(this, i)}>{children}</tr>)
					// table.push(<ListItem onClick={e => { console.log(audio) }}><tr key={i+""} id={i+""}><ListItemText primary={audio.title} secondary={audio.tag} /></tr></ListItem>)
					table.push(<ListItem onClick={e => {this.setState({audio: (currentAudio)}) }}><tr key={i+""} id={i+""}><ListItemText primary={audio.title} secondary={audio.tag }  /></tr></ListItem>)
					
					/*
					<ListItem >
									<ListItemText primary={this.state.audioList.length} secondary="Jan 9, 2014" />
									</ListItem>
									*/

			}
			return table
	}
}

export default App;