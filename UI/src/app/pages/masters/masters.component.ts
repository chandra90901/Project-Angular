import { Component, inject, OnDestroy, OnInit, signal, TemplateRef, WritableSignal } from '@angular/core';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { ModalDismissReasons, NgbDropdownModule, NgbModal, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { master } from '../../models/master';
import { MastersService } from '../../services/masters.service';
import { masterGroup, masterType } from '../../models/masterstype';
import { MasterTypeService } from '../../services/master-type.service';
import { MasterGroupService } from '../../services/master-group.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-masters',
	imports: [AdminLayoutComponent, NgbNavModule, NgbDropdownModule, FormsModule, CommonModule],
	templateUrl: './masters.component.html',
	styleUrl: './masters.component.scss'
})
export class MastersComponent implements OnInit,OnDestroy {
	mySubscription: Subscription = new Subscription();
	active = 'employeeStatus';
	employeeStatues: any = []
	leaveType: any = []
	genders: any = []
	maritalStatus: any = []
	branch: any = []
	country: any = []
	bank: any = []
	accountType: any = []
	designation: any = []
	mastersData: any = []
	masterTypeData: any = []
	masterGroupData: any = []
	bloodGroup: any = []
	_master: master = { Group:'', Type: '', Data: '' }
	_masterType: masterType = { Data: '',MasterGroup:'' }
	_masterGroup: masterGroup = { Data: '' }
	selectedMasterGroup =''
	private modalService = inject(NgbModal);
	closeResult: WritableSignal<string> = signal('');

	constructor(private mastersService: MastersService, private masterTypeService: MasterTypeService
		, private masterGroupService: MasterGroupService
	) {

	}

	ngOnInit(): void {
		this.loadMasterGroup();
		this.loadMasterType();
		this.loadMaster();
	}

	loadMaster() {
		const subs = this.mastersService.getAllMasters().subscribe(data => {
			this.mastersData = data;
			this.employeeStatues = this.mastersData.filter((x: any) => x.Type == 'Employee Status')
			this.genders = this.mastersData.filter((x: any) => x.Type == 'Gender')
			this.maritalStatus = this.mastersData.filter((x: any) => x.Type == 'Marital Status')
			this.branch = this.mastersData.filter((x: any) => x.Type == 'Branch')
			this.country = this.mastersData.filter((x: any) => x.Type == 'Country')
			this.bank = this.mastersData.filter((x: any) => x.Type == 'Bank')
			this.accountType = this.mastersData.filter((x: any) => x.Type == 'Account Type')
			this.designation = this.mastersData.filter((x: any) => x.Type == 'Designation')
			this.bloodGroup = this.mastersData.filter((x: any) => x.Type == 'Blood Group')
			this.leaveType = this.mastersData.filter((x: any) => x.Type == 'Leave Type')
		});
		this.mySubscription.add(subs);
	}

	getMasterDataByType(type: string) {
		return this.mastersData.filter((x: any) => x.Type == type)
	}

	saveMaster() {
		console.log(this._master)
		if (this._master.Type == '' || this._master.Data == '') {
			alert('Type or Data is required');
		}
		else {
			const subs = this.mastersService.addMasters(this._master).subscribe(data => {
				alert('Master data saved successfully');
				this.loadMaster();
				this.modalService.dismissAll()
			});
			this.mySubscription.add(subs);
		}
	}

	loadMasterType() {
		const subs = this.masterTypeService.getAllMasterType().subscribe(data => {
			this.masterTypeData = data;
		});
		this.mySubscription.add(subs);
	}
	deleteMasters(entry: any) {
		if (confirm(`Are you sure you want to delete "${entry.Data}"?`)) {
			const subs = this.mastersService.deleteMasters(entry._id).subscribe(
				(response) => {
					// alert('Entry deleted successfully');
					this.loadMaster();
				},
				(error) => {
					alert('successfully deleted');
				}
			);
			this.mySubscription.add(subs);
		}
	}


	saveMasterType() {
		if (this._masterType.Data == '' || this._masterType.MasterGroup == '') {
			alert('Data & Master Group is required');
		}
		else {
			const subs = this.masterTypeService.addMasterType(this._masterType).subscribe(data => {
				alert('Master Type data saved successfully');
				this.loadMasterType();
				this.modalService.dismissAll()
			});
			this.mySubscription.add(subs);
		}

  	} 	  
	  

	open(content: TemplateRef<any>,modelName='') {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult.set(`Closed with: ${result}`);
			},
			(reason) => {
				this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
			},
		);
	}


	getDismissReason(reason: any) {
		throw new Error('Method not implemented.');
	}

	loadMasterGroup() {
		const subs =this.masterGroupService.getAllMasterGroup().subscribe(data => {
			this.masterGroupData = data;
			if(this.masterGroupData != null && this.masterGroupData.length>0){
				this.selectedMasterGroup =this.masterGroupData[0].Data;
			}
		});
		this.mySubscription.add(subs);
	}
	saveMasterGroup() {
		if (this._masterGroup.Data == '') {
			alert('Data is required');
		}
		else {
			const subs = this.masterGroupService.addMasterGroup(this._masterGroup).subscribe(data => {
				alert('Master Group data saved successfully');
				this.loadMasterGroup();
				this.modalService.dismissAll()
			});
			this.mySubscription.add(subs);
		}

  	}
	getMasterTypeByGroup(group:string){
		return this.masterTypeData.filter((x: any) => x.MasterGroup == group) 
	}
	ngOnDestroy(): void {
		this.mySubscription.unsubscribe(); 
	}
}