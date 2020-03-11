import React,{useState} from 'react';
import ReactSearchBox from 'react-search-box'
import {connect} from 'react-redux';

import CollectionItem from '../../components/collection-item/collection-item';

import {selectCollection} from '../../redux/shop/shop.selectors';

import './collection.scss';

const CollectionPage = ({collection}) =>{
  const [searchField,setSearchField] = useState({searchfield:''});
  const {searchfield} = searchField;
  const {title,items} = collection;
 
const onChangeSearch = (event) =>{
   setSearchField({searchfield: event})
 }

  /* we solve it with isCollectionsLoaded in shop.jsx but this is another solution
  const { title, items } = collection ? collection : {title: '', items: []};*/
  /*we don't have collection=null when is still fetching our collection*/
  const filteredItems = items.filter(item =>{
    return item.name.toLowerCase().includes(searchfield.toLowerCase())});
  
 return(
  <div className='collection-page'>
    <h2 className='title'>{title}</h2>
      <div className='search'>
      <ReactSearchBox
          placeholder={`search ${title}`}
          onChange={onChangeSearch}   
          />
      </div>
    <div className='items'>
       {
        filteredItems.map(item => <CollectionItem key={item.id} item={item} />)
       }
    </div>
  </div>
  )
 }

const mapStateToProps = (state,ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state)
  /*this is necessary because unlike other selectors,
  this selector needs a part of the state depending
  on the URL parameter!*/
  })

export default connect(mapStateToProps)(CollectionPage);