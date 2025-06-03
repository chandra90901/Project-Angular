import { Component, inject, OnDestroy, OnInit, signal, TemplateRef, WritableSignal } from '@angular/core';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { ModalDismissReasons, NgbDropdownModule, NgbModal, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { master } from '../../models/master';
import { MastersService } from '../../services/masters.service';
import { masterType } from '../../models/masterstype';
import { MastertypeService } from '../../services/master-type.service';
import { MastergroupService } from '../../services/master-group.service';
import { Subscription } from 'rxjs';
import { masterGroup } from '../../models/mastergroup';
@Component({
	selector: 'app-masters',
	imports: [AdminLayoutComponent, NgbNavModule, NgbDropdownModule, FormsModule, CommonModule],
	templateUrl: './masters.component.html',
	styleUrl: './masters.component.scss'
})
export class MastersComponent implements OnInit, OnDestroy {
	mySubscription: Subscription = new Subscription();
	active = 'employeeStatusMaster';
	employeeStatusMaster: any = []
	leaveType: any = []
	genderMaster: any = []
	maritalStatuesMaster: any = []
	branchMaster: any = []
	jobTitleMaster: any =[]
	employementTypeMaster: any = []
	countryMaster: any = []
	bankMaster: any = []
	accountTypeMaster: any = []
	designationMaster: any = []
	mastersData: any = []
	masterTypeData: any = []
	masterGroupData: any = []
	bloodGroupMaster: any = []
	_master: any = { GroupId: '', TypeId: '', Data: '' }
	_masterType: any = { Data: '', GroupId: 0 }
	_masterGroup: masterGroup = { Data: '' }
	selectedMasterGroup: number = 0;
	private modalService = inject(NgbModal);
	closeResult: WritableSignal<string> = signal('');
	constructor(private mastersService: MastersService,
		private masterTypeService: MastertypeService
		, private masterGroupService: MastergroupService
	) { }
	ngOnInit(): void {
		this.loadMasterGroup();
		this.loadMasterType();
		this.loadMaster();
	}
	loadMaster() {
		const subs = this.mastersService.getAllMasters().subscribe(data => {
			this.mastersData = data;
			this.employeeStatusMaster = this.mastersData.filter((x: any) => x.Type == 'Employee Status');
			this.genderMaster = this.mastersData.filter((x: any) => x.Type == 'Gender')
			this.employementTypeMaster = this.mastersData.filter((x: any) => x.Type == 'Employement Type')
			this.maritalStatuesMaster = this.mastersData.filter((x: any) => x.Type == 'Marital Status')
			this.branchMaster = this.mastersData.filter((x: any) => x.Type == 'Branch')
			this.jobTitleMaster = this.mastersData.filter((x: any) => x.Type == 'JobTitle')
			this.countryMaster = this.mastersData.filter((x: any) => x.Type == 'Country')
			this.bankMaster = this.mastersData.filter((x: any) => x.Type == 'Bank')
			this.accountTypeMaster = this.mastersData.filter((x: any) => x.Type == 'Account Type')
			this.designationMaster = this.mastersData.filter((x: any) => x.Type == 'Designation')
			this.bloodGroupMaster = this.mastersData.filter((x: any) => x.Type == 'Blood Group')
			this.leaveType = this.mastersData.filter((x: any) => x.Type == 'Leave Type')
		});
		this.mySubscription.add(subs);
	}
	getMasterDataByType(type: number) {
		return this.mastersData.filter((x: any) => x.TypeId == type)
	}
	saveMaster() {
		console.log(this._master)
		if (this._master.TypeId == '' || this._master.Data == '') {
			alert('Type or Data is required');
		}
		else {
			const subs = this.mastersService.addMaster(this._master).subscribe(data => {
				alert('Master data saved successfully');
				this.loadMaster();
				this.modalService.dismissAll()
			});
			this.mySubscription.add(subs);
		}
	}
	loadMasterType() {
		const subs = this.masterTypeService.getAllMasterstype().subscribe(data => {
			this.masterTypeData = data;
		});
		this.mySubscription.add(subs);
	}
	deleteMasters(entry: any) {
		if (confirm(`Are you sure you want to delete "${entry.Data}"?`)) {

			const subs = this.mastersService.deleteMaster(entry.Id).subscribe(
				(response) => {
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
		if (this._masterType.Data == '' || this._masterType.GroupId == 0) {
			alert('Data & Master GroupId is required');
		}
		else {
			const subs = this.masterTypeService.addMastertype(this._masterType).subscribe(data => {
				alert('Master Type data saved successfully');
				this.loadMasterType();
				this.modalService.dismissAll()
			});
			this.mySubscription.add(subs);
		}
	}
	open(content: TemplateRef<any>, modelName = '') {
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
		const subs = this.masterGroupService.getAllMastersgroup().subscribe(data => {
			this.masterGroupData = data;
			if (this.masterGroupData != null && this.masterGroupData.length > 0) {
				this.selectedMasterGroup = this.masterGroupData[0].Id;
			}
		});
		this.mySubscription.add(subs);
	}
	saveMasterGroup() {
		if (this._masterGroup.Data == '') {
			alert('Data is required');
		}
		else {
			const subs = this.masterGroupService.addMastergroup(this._masterGroup).subscribe(data => {
				alert('Master Group data saved successfully');
				this.loadMasterGroup();
				this.modalService.dismissAll()
			});
			this.mySubscription.add(subs);
		}

	}
	getMasterTypeByGroup(groupId: number) {
		return this.masterTypeData.filter((x: any) => x.GroupId == groupId)
	}
	ngOnDestroy(): void {
		this.mySubscription.unsubscribe();
	}
}