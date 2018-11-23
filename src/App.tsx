// import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';

// import { withStyles } from '@material-ui/core/styles';
// import * as PropTypes from 'prop-types';

import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';

import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import * as React from 'react';

import Modal from 'react-responsive-modal';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MediaStreamRecorder from 'msr';

import './App.css';

interface IState {
	audio: any,
	audioList: any,
	audioListGen: boolean,
	editOpen: boolean,
	open: boolean,
	uploadFileList: any,
	uploadedBase64: any,
}



class App extends React.Component<{}, IState> {
	constructor(props: any) {
        super(props)
        this.state = {
			audio: { "author": "blank", "file": "UklGRhwMAABXQVZFZm10IBAAAAABAAEAgD4AAIA+AAABAAgAZGF0Ya4LAACAgICAgICAgICAgICAgICAgICAgICAgICAf3hxeH+AfXZ1eHx6dnR5fYGFgoOKi42aloubq6GOjI2Op7ythXJ0eYF5aV1AOFFib32HmZSHhpCalIiYi4SRkZaLfnhxaWptb21qaWBea2BRYmZTVmFgWFNXVVVhaGdbYGhZbXh1gXZ1goeIlot1k6yxtKaOkaWhq7KonKCZoaCjoKWuqqmurK6ztrO7tbTAvru/vb68vbW6vLGqsLOfm5yal5KKhoyBeHt2dXBnbmljVlJWUEBBPDw9Mi4zKRwhIBYaGRQcHBURGB0XFxwhGxocJSstMjg6PTc6PUxVV1lWV2JqaXN0coCHhIyPjpOenqWppK6xu72yxMu9us7Pw83Wy9nY29ve6OPr6uvs6ezu6ejk6erm3uPj3dbT1sjBzdDFuMHAt7m1r7W6qaCupJOTkpWPgHqAd3JrbGlnY1peX1hTUk9PTFRKR0RFQkRBRUVEQkdBPjs9Pzo6NT04Njs+PTxAPzo/Ojk6PEA5PUJAQD04PkRCREZLUk1KT1BRUVdXU1VRV1tZV1xgXltcXF9hXl9eY2VmZmlna3J0b3F3eHyBfX+JgIWJiouTlZCTmpybnqSgnqyrqrO3srK2uL2/u7jAwMLFxsfEv8XLzcrIy83JzcrP0s3M0dTP0drY1dPR1dzc19za19XX2dnU1NjU0dXPzdHQy8rMysfGxMLBvLu3ta+sraeioJ2YlI+MioeFfX55cnJsaWVjXVlbVE5RTktHRUVAPDw3NC8uLyknKSIiJiUdHiEeGx4eHRwZHB8cHiAfHh8eHSEhISMoJyMnKisrLCszNy8yOTg9QEJFRUVITVFOTlJVWltaXmNfX2ZqZ21xb3R3eHqAhoeJkZKTlZmhpJ6kqKeur6yxtLW1trW4t6+us7axrbK2tLa6ury7u7u9u7vCwb+/vr7Ev7y9v8G8vby6vru4uLq+tri8ubi5t7W4uLW5uLKxs7G0tLGwt7Wvs7avr7O0tLW4trS4uLO1trW1trm1tLm0r7Kyr66wramsqaKlp52bmpeWl5KQkImEhIB8fXh3eHJrbW5mYGNcWFhUUE1LRENDQUI9ODcxLy8vMCsqLCgoKCgpKScoKCYoKygpKyssLi0sLi0uMDIwMTIuLzQ0Njg4Njc8ODlBQ0A/RUdGSU5RUVFUV1pdXWFjZGdpbG1vcXJ2eXh6fICAgIWIio2OkJGSlJWanJqbnZ2cn6Kkp6enq62srbCysrO1uLy4uL+/vL7CwMHAvb/Cvbq9vLm5uba2t7Sysq+urqyqqaalpqShoJ+enZuamZqXlZWTkpGSkpCNjpCMioqLioiHhoeGhYSGg4GDhoKDg4GBg4GBgoGBgoOChISChISChIWDg4WEgoSEgYODgYGCgYGAgICAgX99f398fX18e3p6e3t7enp7fHx4e3x6e3x7fHx9fX59fn1+fX19fH19fnx9fn19fX18fHx7fHx6fH18fXx8fHx7fH1+fXx+f319fn19fn1+gH9+f4B/fn+AgICAgH+AgICAgIGAgICAgH9+f4B+f35+fn58e3t8e3p5eXh4d3Z1dHRzcXBvb21sbmxqaWhlZmVjYmFfX2BfXV1cXFxaWVlaWVlYV1hYV1hYWVhZWFlaWllbXFpbXV5fX15fYWJhYmNiYWJhYWJjZGVmZ2hqbG1ub3Fxc3V3dnd6e3t8e3x+f3+AgICAgoGBgoKDhISFh4aHiYqKi4uMjYyOj4+QkZKUlZWXmJmbm52enqCioqSlpqeoqaqrrK2ur7CxsrGys7O0tbW2tba3t7i3uLe4t7a3t7i3tre2tba1tLSzsrKysbCvrq2sq6qop6alo6OioJ+dnJqZmJeWlJKSkI+OjoyLioiIh4WEg4GBgH9+fXt6eXh3d3V0c3JxcG9ubWxsamppaWhnZmVlZGRjYmNiYWBhYGBfYF9fXl5fXl1dXVxdXF1dXF1cXF1cXF1dXV5dXV5fXl9eX19gYGFgYWJhYmFiY2NiY2RjZGNkZWRlZGVmZmVmZmVmZ2dmZ2hnaGhnaGloZ2hpaWhpamlqaWpqa2pra2xtbGxtbm1ubm5vcG9wcXBxcnFycnN0c3N0dXV2d3d4eHh5ent6e3x9fn5/f4CAgIGCg4SEhYaGh4iIiYqLi4uMjY2Oj5CQkZGSk5OUlJWWlpeYl5iZmZqbm5ybnJ2cnZ6en56fn6ChoKChoqGio6KjpKOko6SjpKWkpaSkpKSlpKWkpaSlpKSlpKOkpKOko6KioaKhoaCfoJ+enp2dnJybmpmZmJeXlpWUk5STkZGQj4+OjYyLioqJh4eGhYSEgoKBgIB/fn59fHt7enl5eHd3dnZ1dHRzc3JycXBxcG9vbm5tbWxrbGxraWppaWhpaGdnZ2dmZ2ZlZmVmZWRlZGVkY2RjZGNkZGRkZGRkZGRkZGRjZGRkY2RjZGNkZWRlZGVmZWZmZ2ZnZ2doaWhpaWpra2xsbW5tbm9ub29wcXFycnNzdHV1dXZ2d3d4eXl6enp7fHx9fX5+f4CAgIGAgYGCgoOEhISFhoWGhoeIh4iJiImKiYqLiouLjI2MjI2OjY6Pj46PkI+QkZCRkJGQkZGSkZKRkpGSkZGRkZKRkpKRkpGSkZKRkpGSkZKRkpGSkZCRkZCRkI+Qj5CPkI+Pjo+OjY6Njo2MjYyLjIuMi4qLioqJiomJiImIh4iHh4aHhoaFhoWFhIWEg4SDg4KDgoKBgoGAgYCBgICAgICAf4CAf39+f35/fn1+fX59fHx9fH18e3x7fHt6e3p7ent6e3p5enl6enl6eXp5eXl4eXh5eHl4eXh5eHl4eXh5eHh3eHh4d3h4d3h3d3h4d3l4eHd4d3h3eHd4d3h3eHh4eXh5eHl4eHl4eXh5enl6eXp5enl6eXp5ent6ent6e3x7fHx9fH18fX19fn1+fX5/fn9+f4B/gH+Af4CAgICAgIGAgYCBgoGCgYKCgoKDgoOEg4OEg4SFhIWEhYSFhoWGhYaHhoeHhoeGh4iHiIiHiImIiImKiYqJiYqJiouKi4qLiouKi4qLiouKi4qLiouKi4qLi4qLiouKi4qLiomJiomIiYiJiImIh4iIh4iHhoeGhYWGhYaFhIWEg4OEg4KDgoOCgYKBgIGAgICAgH+Af39+f359fn18fX19fHx8e3t6e3p7enl6eXp5enl6enl5eXh5eHh5eHl4eXh5eHl4eHd5eHd3eHl4d3h3eHd4d3h3eHh4d3h4d3h3d3h5eHl4eXh5eHl5eXp5enl6eXp7ent6e3p7e3t7fHt8e3x8fHx9fH1+fX59fn9+f35/gH+AgICAgICAgYGAgYKBgoGCgoKDgoOEg4SEhIWFhIWFhoWGhYaGhoaHhoeGh4aHhoeIh4iHiIeHiIeIh4iHiIeIiIiHiIeIh4iHiIiHiIeIh4iHiIeIh4eIh4eIh4aHh4aHhoeGh4aHhoWGhYaFhoWFhIWEhYSFhIWEhISDhIOEg4OCg4OCg4KDgYKCgYKCgYCBgIGAgYCBgICAgICAgICAf4B/f4B/gH+Af35/fn9+f35/fn1+fn19fn1+fX59fn19fX19fH18fXx9fH18fXx9fH18fXx8fHt8e3x7fHt8e3x7fHt8e3x7fHt8e3x7fHt8e3x7fHt8e3x8e3x7fHt8e3x7fHx8fXx9fH18fX5+fX59fn9+f35+f35/gH+Af4B/gICAgICAgICAgICAgYCBgIGAgIGAgYGBgoGCgYKBgoGCgYKBgoGCgoKDgoOCg4KDgoOCg4KDgoOCg4KDgoOCg4KDgoOCg4KDgoOCg4KDgoOCg4KDgoOCg4KDgoOCg4KDgoOCg4KCgoGCgYKBgoGCgYKBgoGCgYKBgoGCgYKBgoGCgYKBgoGCgYKBgoGCgYKBgoGBgYCBgIGAgYCBgIGAgYCBgIGAgYCBgIGAgYCBgIGAgYCAgICBgIGAgYCBgIGAgYCBgIGAgYCBgExJU1RCAAAASU5GT0lDUkQMAAAAMjAwOC0wOS0yMQAASUVORwMAAAAgAAABSVNGVBYAAABTb255IFNvdW5kIEZvcmdlIDguMAAA"
			, "id":-1, "tag":"No tags", "timestamp":"", "title":"Select a song"},
			audioList: ["blank"],
			audioListGen: true,
			editOpen: false,
			open: false,
			uploadFileList: null,
			uploadedBase64: "default"
		}     	

		this.changeAudio = this.changeAudio.bind(this)
		this.handleFileUpload = this.handleFileUpload.bind(this)
		this.uploadAudio = this.uploadAudio.bind(this)
		this.getAudioList = this.getAudioList.bind(this)
		this.createTable = this.createTable.bind(this)
		this.getBase64Edit = this.getBase64Edit.bind(this)
		this.getBase64Upload = this.getBase64Upload.bind(this)
		this.deleteAudio = this.deleteAudio.bind(this)
		this.editAudio = this.editAudio.bind(this)
		this.filterSearchList = this.filterSearchList.bind(this)
		this.searchQueryByVoice = this.searchQueryByVoice.bind(this)

	}

	public render() {
		if (this.state.audioListGen === true) {
			this.getAudioList()
			this.setState({
				audioListGen: false
			})
		}
		const { open, editOpen } = this.state;
		return (
		<div>
			<div id="navbar">
			     <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
			<img src="/audiocat-logo.png" alt="Audiocat Logo" width="100px" height="100px"/>
          </Typography>
        </Toolbar>
      </AppBar>
	  </div>

			
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
					<div className="form-group">
						<label>Author</label>
						<input type="text" className="form-control-file" id="author-input" />
					</div>
					<button type="button" className="btn" onClick={this.getBase64Edit}>Upload</button>
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
					<div className="form-group">
						<label>Author</label>
						<input type="text" className="form-control-file" id="author-input" />
					</div>

					<button type="button" className="btn" onClick={this.getBase64Upload}>Upload</button>
				</form>
			</Modal>
			{/*
			<h1 style={{ textAlign: "center" }}> {this.state.audio.title + "🎵"} </h1>
			<h3 style={{ textAlign: "center" }}> {this.state.audio.tag} </h3>
			*/}
{/*
		      <Typography component="h2" variant="h1" gutterBottom={true}>
        h1. Audiocat
      </Typography>
	  <Typography component="h3" variant="h3" gutterBottom={true}>
        h2. The simple and free audio player
      </Typography>
	  {/*<div style={{width: "100%", height: "0px", position: "relative"}}><iframe src="https://streamable.com/s/kq0xg/fwu
	  */
}
	  {/*
	  <video controls={true} src="https://streamable.com/s/kq0xg/fwu"> 
	  <source type="video/mp4" />
	  </video>
	  */}
	  {/*
	  <video autoPlay={true} muted={true} loop={true} id="myVideo" style={{width: "100%", height: "auto"}}>
  		<source src="./keyboardcat.mp4" type="video/mp4"/>
	  </video>
	  */}
	  <div id={"outer-container"}>
		<div id={"inner-container"}>
			<div id={"video-overlay"}>
				<Typography component="h2" variant="h1" gutterBottom={true} style={{fontFamily: 'Raleway', color:" #ffffff", fontSize: "1.5em"}}>
			<b>Audiocat</b>
		</Typography>
		<Typography component="h3" variant="h2" gutterBottom={true} style={{fontFamily: 'Raleway', color:" #ffffff", fontSize: "1em"}}>
			The free audio sharing website<br/><br/>
	  		<div style={{textAlign: "center"}}>
			<i className="fa fa-angle-double-down" style={{textAlign: "center"}}/>
			</div>
		</Typography>
		<br/>
		{/*
		<Typography component="h3" variant="h2" gutterBottom={true} style={{ color:" #ffffff", fontFamily: 'Helvetica', fontSize: "0.7em",
		textAlign: "center"}}>
		<div style={{color: "#ffa500"}}>
			Get started! <br/>
			<i className="fa fa-angle-double-down" style={{textAlign: "center"}}/>
		</div>
		</Typography>
		*/}
			</div>
			<video id={"player"} autoPlay={true} muted={true} loop={true} style={{width: "100%", height: "auto"}}>
			<source src="https://eric.co.nz/assets/video/keyboardcatcolour.mp4" type="video/mp4"/>
		</video>
		</div>
	</div>
		<Grid item={true} xs={12} style={{paddingTop:"10%"}}>
          <Grid container={true} className={"columns"} justify="center" spacing={8}>
            {[0].map(value => (
              <Grid key={value} item={true} style={{paddingBottom: "5%"}}>



			<Paper className={"root"}>
			<Grid container={true} spacing={16}>
			  <Grid item={true} style={{marginTop: "5%"}}>
				<ButtonBase className={"audio"} id="audio-player" style={{justifyContent: "center", display: "flex", alignItems: "center"}}>
				<audio controls={true} src={"data:audio/wav;base64," + this.state.audio.file }/*style={{paddingTop:"10%"}}*/>
							{/* <source src="http://puu.sh/C4d9s/5634f362c7.wav" type="audio/wav"/> */}
							{/*<source src={"data:audio/wav;base64," + this.state.audio.file} type="audio/wav"/>*/}
							{ /*<source src={"data:audio/wav;base64," + this.state.audio.file } /> */}
							Your browser does not support the audio tag.
				</audio>				
				</ButtonBase>
			  </Grid>
			  <Grid item={true} xs={12} sm={true} container={true}>
				<Grid item={true} xs={true} container={true} direction="column" spacing={16}>
				  <Grid item={true} xs={true}>
					<Typography gutterBottom={true} variant="subtitle1" style={{textAlign: "center"}}>
					<b>
						{this.state.audio.title + "🎵"} 
					</b>
					</Typography>
					<Typography gutterBottom={true} style={{textAlign: "center"}}>
						{this.state.audio.tag}
					</Typography>
					<Typography color="textSecondary" style={{textAlign: "center"}}>ID: {this.state.audio.id}</Typography>
				  </Grid>
				  <Grid item={true}>
					<Typography style={{ cursor: 'pointer', textAlign: "center" }} >Author: {this.state.audio.author}</Typography>
				  </Grid>
					<Grid item={true}>
					<ButtonBase className={"audio"} >
						<Button variant="contained" color="secondary" onClick={this.deleteAudio} style={{position:"relative", left:"0", bottom:"0"}}>
						<DeleteIcon />
						</Button>
						<Button variant="contained" color="primary" onClick={this.onEditOpenModal} style={{position:"relative", left:"0", bottom:"0"}}>
						<EditIcon />
						</Button>
						</ButtonBase>
						<br/>
						<br/>

					</Grid>
				</Grid>

			  </Grid>
			</Grid>
		  </Paper>


              </Grid>
            ))}
            {[1].map(value => (
              <Grid key={value} item={true}>
                <Paper className={"audioList"} style={{paddingTop: "10px"}} >
				<List>
				<div id="searchBar" style={{paddingLeft: "5%"}}>
				
				<TextField id="search-input" placeholder="Search"/>		
				&nbsp;&nbsp;
					
				<Button variant="contained" color="primary" onClick={this.filterSearchList} style={{position:"relative", left:"0", bottom:"0"}}>
				<SearchIcon />
			</Button>
			<div className="btn" onClick={this.searchQueryByVoice} ><i className="fa fa-microphone" /></div>
			</div>
			<br/>
		

									<div style={{textAlign: "left"}}>
									<div className="btn btn-primary btn-action btn-add" onClick={this.onOpenModal}>Add Audio</div>

									<b> <div style={{marginLeft: "5%"}}>Audio List: </div></b> 				

									</div>
									<hr/>
									{this.createTable()}
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

	private getAudioList() {
		fetch("https://audiocatapi2g.azurewebsites.net/api/Audio").then(d => d.json())
		.then(d => {
			// console.log(d)
			// d.title = "ayy lmao"
			this.setState({
				audioList: d
			})
		})
	}

	private filterSearchList() {
		const searchQueryObj = document.getElementById("search-input") as HTMLInputElement
		const searchQuery = searchQueryObj.value
		if (searchQuery === ""){
			this.getAudioList()
			return
		}
		const url = "https://audiocatapi2g.azurewebsites.net/api/Audio/searchQuery"
		fetch(url + "?=" + searchQuery).then(d => d.json())
		.then(d => {
			// d.title = "ayy lmao"
			this.setState({
				audioList: d
			})
		})
	}

	private changeAudio() {
		fetch("http://audiocatapi2g.azurewebsites.net/api/audio/1").then(d => d.json())
		.then(d => {
			// console.log(d)
			// d.title = "ayy lmao"
			this.setState({
				audio: d
			})
			
		})
	}
	private deleteAudio(){
		const url = "https://audiocatapi2g.azurewebsites.net/api/audio/" + this.state.audio.id
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
				alert(this.state.audio.title + " has been removed")
				location.reload()
			}
		})
	}

	private editAudio() {
		const titleInput = document.getElementById("title-input") as HTMLInputElement
		const tagInput = document.getElementById("tag-input") as HTMLInputElement
		const authorInput = document.getElementById("author-input") as HTMLInputElement
		// const authorInput = document.getElementById("author-input") as HTMLInputElement
		// const fileInput = document.getElementById("audio-file-input").files[0] as HTMLInputElement
		const utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
		// const audioFile = this.state.uploadFileList[0]
		let title = ""
		let tag = ""
		let author = ""
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
		 if (tag === null) {
			author = this.state.audio.author
	   	 }
	   	 else{
	     	author = authorInput.value
		 }
		 
		 const type = this.state.uploadFileList[0].type.substring(0,5)
		 if (type === "audio"){
			 console.log("hey this is a valid audio file!")
		 }
		 else{
			 alert("Please enter a valid audio file eg .wav")
			 return
		 }
		 
		const formData = {"id": this.state.audio.id, "title":  title , "tag": tag, "timestamp": utc.toString(), "file": this.state.uploadedBase64.split(',')[1], "author": author }
		const url = "https://audiocatapi2g.azurewebsites.net/api/audio/" + this.state.audio.id
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

	private handleFileUpload(fileList: any) {
		this.setState({
			uploadFileList: fileList.target.files
		})
	}
	
	 private getBase64Edit() {
		if (this.state.uploadFileList === null) {
			alert("Please enter a file")
			return
		}
		const file = this.state.uploadFileList[0]
		const fileReader: FileReader = new FileReader();
		
		fileReader.addEventListener("load", (e) => {
			this.setState({ uploadedBase64: fileReader.result });
			{this.editAudio()}
			// console.log(this.state.uploadedBase64)
			// return this.state.uploadedBase64
		});

	 fileReader.readAsDataURL(file);
}

private getBase64Upload() {
	if (this.state.uploadFileList === null) {
		alert("Please enter a file")
		return
	}
	const file = this.state.uploadFileList[0]
	const fileReader: FileReader = new FileReader();
	
	fileReader.addEventListener("load", (e) => {
		this.setState({ uploadedBase64: fileReader.result });
		{this.uploadAudio()}
		// console.log(this.state.uploadedBase64)
		// return this.state.uploadedBase64
	});

 fileReader.readAsDataURL(file);
}

		
	

	private uploadAudio() {
		const titleInput = document.getElementById("title-input") as HTMLInputElement
		const tagInput = document.getElementById("tag-input") as HTMLInputElement
		const authorInput = document.getElementById("author-input") as HTMLInputElement

		// const fileInput = document.getElementById("audio-file-input").files[0] as HTMLInputElement
		const utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
		// const audioFile = this.state.uploadFileList[0]
		 if (titleInput === null || tagInput === null || authorInput === null) {
			alert("Please fill out the fields")
		 	return;
		 }

		if (this.state.uploadFileList === null) {
			alert("There is no file")
			return;
		}
	
		const title = titleInput.value
		const tag = tagInput.value
		const author = authorInput.value

		const type = this.state.uploadFileList[0].type.substring(0,5)
		console.log("type is: " + type)
		if (type === "audio"){
			console.log("hey this is a valid audio file!")
		}
		else{
			alert("Please enter a valid audio file eg .wav")
			return
		}
		const formData = {"title":  title , "tag": tag, "timestamp": utc.toString(), "file": this.state.uploadedBase64.split(',')[1], "author": author}
		// JSON.stringify(formData)

		const url = "https://audiocatapi2g.azurewebsites.net/api/audio"
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
			for (let i = 0; i < this.state.audioList.length; i++) {
					const children = []
					const audio = this.state.audioList[i]
					children.push(<td key={"id" + i}>{audio.id}</td>)
					children.push(<td key={"name" + i}>{audio.title}</td>)
					children.push(<td key={"tags" + i}>{audio.tag}</td>)
					const currentAudio = {"id": audio.id, "title": audio.title , "tag": audio.tag, "timestamp": audio.timestamp, "file": audio.file, "author": audio.author}
					// table.push(<tr key={i+""} id={i+""} onClick= {this.selectRow.bind(this, i)}>{children}</tr>)
					// table.push(<ListItem onClick={e => { console.log(audio) }}><tr key={i+""} id={i+""}><ListItemText primary={audio.title} secondary={audio.tag} /></tr></ListItem>)
					table.push(<ListItem onClick={e => {this.setState({audio: (currentAudio)}) 
				}}><tr key={i+""} id={i+""} style={{cursor: 'pointer'}}><ListItemText primary={audio.title} secondary={audio.tag }  /></tr></ListItem>)
					
					/*
					<ListItem >
									<ListItemText primary={this.state.audioList.length} secondary="Jan 9, 2014" />
									</ListItem>
									*/

			}
			return table
	}

	private searchQueryByVoice(){
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
        const textBox = document.getElementById("search-input") as HTMLInputElement
        textBox.value = (res.DisplayText as string).slice(0, -1)
    }).catch((error) => {
        console.log("Error", error)
    });

    }
}

export default App;