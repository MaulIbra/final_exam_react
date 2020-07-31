import React from 'react';
import {shallow} from 'enzyme'
import FormOption from "../component/FormOption";


const mockData = [
    {
        "id": 11,
        "name": "ACEH"
    },
    {
        "id": 12,
        "name": "SUMATERA UTARA"
    }
]
describe('<FormOption/>',()=>{
    it('should <FormOption> return one div', function () {
        const wrapper = shallow(<FormOption data={mockData}/>)
        expect(wrapper.find('div').length).toBe(1);
    });
    it('should  <FormOption> have three option', function () {
        const mockedOnChange = jest.fn();
        const wrapper = shallow(<FormOption keys={"province"} data={mockData} change={mockedOnChange} disable={false}/>)
        expect(wrapper.find('option').length).toBe(3);
    });
    it('should  <FormOption> render without error', function () {
        const mockedOnChange = jest.fn();
        const wrapper = shallow(<FormOption keys={"province"} data={mockData} change={mockedOnChange} disable={false}/>)
        expect(wrapper.text()).toBe("-- Pilih Provinsi --ACEHSUMATERA UTARA");
    });
    it('should <FormOption> select corectly', function () {
        const mockedChange = jest.fn()
        const wrapper = shallow(<FormOption keys={"province"} data={mockData} change={mockedChange} disable={false}/>)
        wrapper.find('.list__option').last().simulate('click', null);
        expect(wrapper.find('.list__value-container').text()).toEqual('two');
    });
})