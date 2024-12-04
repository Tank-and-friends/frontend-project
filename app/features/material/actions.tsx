import {Image} from 'react-native';
import DocumentPicker, {types} from 'react-native-document-picker';
export const pickFile = async () => {
  try {
    const result = await DocumentPicker.pickSingle({
      type: [
        types.images,
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ],
    });
    return {
      uri: result.uri,
      type: result.type,
      name: result.name,
    };
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      console.log('File selection was canceled');
    } else {
      console.error('Error picking file:', err);
    }
    return null;
  }
};

export const exportFileType = (type: string) => {
  const index = type.indexOf('.');
  return type.substring(index + 1, type.length);
};

export const fileSymbol = (type: string) => {
  if (['jpeg', 'jpg', 'png'].includes(type.toLocaleLowerCase())) {
    return (
      <Image source={require('../../assets/icons/icon-default-image.png')} />
    );
  } else if (['docx', 'doc', 'txt'].includes(type.toLocaleLowerCase())) {
    return <Image source={require('../../assets/icons/icon-word.png')} />;
  } else if (['pdf'].includes(type.toLocaleLowerCase())) {
    return <Image source={require('../../assets/icons/icon-pdf.png')} />;
  } else if (['xls', 'xlsx'].includes(type.toLocaleLowerCase())) {
    return <Image source={require('../../assets/icons/icon-excel.png')} />;
  }
};

export const getPreviewDocumentUrl = (url: string) => {
  if (url.includes('drive.google.com')) {
    url = url.substring(0, url.indexOf('view?'));
    url += 'preview';
  } else if (url.includes('docs.google.com')) {
    url = url.substring(0, url.indexOf('edit?'));
    url += 'preview';
  }
  return url;
};
