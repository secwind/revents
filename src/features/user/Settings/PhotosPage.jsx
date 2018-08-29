import React, { Component } from 'react';
import {
  Image,
  Segment,
  Header,
  Divider,
  Grid,
  Button,
  Card,
  Icon
} from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { connect } from 'react-redux';
import { uploadProfileImage, deletedPhoto, setMainPhoto } from '../userAction';
import { toastr } from 'react-redux-toastr';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const query = ({ auth }) => {
  return [
    {
      collection: 'users',
      doc: auth.uid,
      subcollections: [{ collection: 'photos' }],
      // storeAs: 'photos' สร้างคลังสมมุติชื่อ state->firestore->ordered->photos
      storeAs: 'photos'
    }
  ];
};

const actions = {
  uploadProfileImage,
  deletedPhoto,
  setMainPhoto
};

const mapState = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,

  // photos: state.firestore.ordered.photos มาจากคลังสมมุติ
  photos: state.firestore.ordered.photos,

  loading: state.async.loading
});

class PhotosPage extends Component {
  state = {
    files: [],
    fileName: '',
    cropResult: null,
    image: {}
  };

  uploadImage = async () => {
    try {
      await this.props.uploadProfileImage(
        this.state.image,
        this.state.fileName
      );
      this.cancelCrop();
      toastr.success('Success', 'การอัพโหลดรูปภาพสำเร็จ!!');
    } catch (error) {
      toastr.error('Oops', error.message);
    }
  };

  handlePhotoDelete = (photo) => async () => {
    try {
      this.props.deletedPhoto(photo)
      toastr.success('Success', 'ลบรูปภาพสำเร็จแล้ว')
    } catch (error) {
      toastr.error('Oop', error.message)
    }
  }

  handleSetMainPhoto = photo => async () => {
    try {
      this.props.setMainPhoto(photo)
    } catch (error) {
      toastr.error('Oop', error.message)
    }
  }

  cancelCrop = () => {
    this.setState({
      files: [],
      image: {}
    });
  };

  cropImage = () => {
    if (typeof this.refs.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }

    this.refs.cropper.getCroppedCanvas().toBlob(blob => {
      let imageUrl = URL.createObjectURL(blob);
      this.setState({
        cropResult: imageUrl,
        image: blob
      });
    }, 'image/jpeg');
  };

  onDrop = files => {
    this.setState({
      files,
      fileName: files[0].name
    })
  }
  render() {
    const { profile, photos, loading } = this.props;
    let filteredPhotos
    if (photos) {
      filteredPhotos = photos.filter(photo => {
        return photo.url !== profile.photoURL
      })
    }
    return (
      <Segment>
        <Header dividing size="large" content="Your Photos" />
        <Grid>
          <Grid.Row />
          <Grid.Column width={4}>
            <Header color="teal" sub content="Step 1 - Add Photo" />
            <Dropzone onDrop={this.onDrop} multiple={false}>
              <div style={{ paddingTop: '30px', textAlign: 'center' }}>
                <Icon name="upload" size="huge" />
                <Header content="Drop image here or click!!" />
              </div>
            </Dropzone>
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header sub color="teal" content="Step 2 - Resize image" />
            {this.state.files[0] && (
              <Cropper
                style={{ height: 200, width: '100%' }}
                ref="cropper"
                src={this.state.files[0].preview}
                aspectRatio={1}
                viewMode={0}
                dragMode="move"
                guides={false}
                scalable={true}
                cropBoxMovable={true}
                cropBoxResizable={true}
                crop={this.cropImage}
              />
            )}
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header sub color="teal" content="Step 3 - Preview and Upload" />
            {this.state.files[0] && (
              <div>
                <Image
                  style={{ minHeight: '200px', minWidth: '200px' }}
                  src={this.state.cropResult}
                />
                <Button.Group>
                  <Button
                    loading={loading}
                    onClick={this.uploadImage}
                    style={{ width: '100px' }}
                    positive
                    icon="check"
                  />
                  <Button
                    disable={loading}
                    onClick={this.cancelCrop}
                    style={{ width: '100px' }}
                    icon="close"
                  />
                </Button.Group>
              </div>
            )}
          </Grid.Column>
        </Grid>

        <Divider />
        <Header sub color="teal" content="All Photos" />

        <Card.Group itemsPerRow={5}>
          <Card>
          {/* profile.photoURL คือรูปโปรไฟล์ ข้อมูลมาจาก state.firebase.profile.photoURL  ถ้าไม่มีก็ใช้รุปของ '/assets/images/user.png'*/}
            <Image src={profile.photoURL || '/assets/images/user.png'} />
            <Button positive>Main Photo</Button>
          </Card>     
         {/* ถ้ามี photos  ให้ map filteredPhotosโดยมีเงื่อนไงว่า ห้ามให้รุปซ้ำกับ  state.firebase.profile.photoURL */}
          {photos &&
            filteredPhotos.map(photo => (
              <Card key={photo.id}>
                <Image src={photo.url} />
                <div className="ui two buttons">
                  <Button onClick={this.handleSetMainPhoto(photo)} basic color="green">
                    Main
                  </Button>
                  <Button onClick={this.handlePhotoDelete(photo)} basic icon="trash" color="red" />
                </div>
              </Card>
            ))}
        </Card.Group>
      </Segment>
    );
  }
}

export default compose(
  connect(
    mapState,
    actions
  ),
  firestoreConnect(auth => query(auth))
)(PhotosPage);
