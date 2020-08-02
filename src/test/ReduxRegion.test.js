import React from 'react';
import {setDistrict} from "../redux/reducer/action/region/Region";
import regionTodo from "../redux/reducer/region/RegionReducer";

describe('actions', () => {
    it('should create an action to get a list district', () => {
        const data = []
        const expectedAction = {
            type : 'SET_DISTRICT',
            payload : []
        }
        expect(setDistrict(data)).toEqual(expectedAction)
    })
})

describe('region reducer', () => {
    it('should return the initial state', () => {
        expect(regionTodo(undefined, {})).toEqual(
            {
                province : [],
                districts : [],
                subDistrict : [],
                village : []
            }
        )
    })

    it('should handle setProvince', () => {
        expect(regionTodo([], {
                type: 'SET_PROVINCE',
                payload: [{}]
            })
        ).toEqual({
            province:[{}]
        })
    })

    it('should handle setDistrict', () => {
        expect(regionTodo([], {
                type: 'SET_DISTRICT',
                payload: [{}]
            })
        ).toEqual({
            districts:[{}]
        })
    })

    it('should handle setSubDistrict', () => {
        expect(regionTodo([], {
                type: 'SET_SUB_DISTRICT',
                payload: [{}]
            })
        ).toEqual({
            subDistrict:[{}]
        })
    })

    it('should handle setVillage', () => {
        expect(regionTodo([], {
                type: 'SET_VILLAGE',
                payload: [{}]
            })
        ).toEqual({
            village:[{}]
        })
    })
})