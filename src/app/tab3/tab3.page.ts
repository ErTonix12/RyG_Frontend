import { Component } from '@angular/core';
import { Premio } from '../model/Premio';
import { Usuario } from '../model/Usuario';
import { PremioService } from '../services/premio.service';
import { ToastService } from '../services/toast.service';
import { UsuariosService } from '../services/usuarios.service';
import { CreateUserPage } from '../pages/create-user/create-user.page';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public listado: Array<Usuario>;
  public usuarios: Usuario[] = [];
  public usuario: Usuario;

  constructor(private api: PremioService,
    private usuarioService: UsuariosService,
    private toast: ToastService,
    public alertController: AlertController,
    private modalController: ModalController) { }

  async ionViewDidEnter() {
    await this.getUsuarios();
  }

  public async getUsuarios(id?: any) {
    if (id != undefined && id > -1) {
      console.log(id);
      this.usuarioService.getUsuarios(id);
    } else {
      console.log(id);
      this.usuarios = await this.usuarioService.getUsuarios();
      // this.toast.showToast('éxito', 'success');
    }
  }

  public getUsuarioByCoordinates(latitud: Number, longitud: Number) {
    if (latitud != undefined && longitud != undefined) {
      console.log("Lat:" + latitud + ". Long: " + longitud);
      this.usuarioService.getUsuarioByCoordinates(latitud, longitud);
    }
  }

  public postUsuario() {
    let usuario: Usuario = {
      id: -1,
      contrasena: "prueba contraseña",
      direccion: "calle prueba nº3",
      email: "prueba@hotmail.com",
      latitud: 12,
      longitud: 11,
      nombre_comercio: "empresa prueba",
      participaciones: 0,
      telefono: "616123456"
    }
    // this.usuarioService.postUsuario(usuario);
  }

  public putUsuario() {
    let usuario: Usuario = {
      id: 3,
      contrasena: "prueba contraseña",
      direccion: "calle prueba nº3",
      email: "prueba@hotmail.com",
      latitud: 12,
      longitud: 11,
      nombre_comercio: "empresa prueba",
      participaciones: 0,
      telefono: "616123456"
    }
    // this.usuarioService.putUsuario(usuario);
  }

  public async deleteUsuario(usuario: Usuario) {
    const alert = await this.alertController.create({
      header:'Confirmación',
      message:'¿Estás seguro de que quieres eliminar?',
      buttons: [
        {
          text: 'Cancelar',
          handler:(blah) => {

          }
        },
        {
          text: 'Eliminar',
          handler: async()=> {
            try {
              await this.usuarioService.deleteUsuario(usuario.id);
              console.log(this.usuario);
              let i = this.usuarios.indexOf(usuario, 0);
              this.toast.showToast("Usuario eliminado con éxito", "success")
              if(i>-1) {
                this.usuarios.splice(i,1);
              }
            } catch (error) {
              console.log(error);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  public testToast(msg: string, color: string) {
    this.toast.showToast(msg, color);
  }

  public async crear(usuario: Usuario) {
    const modal = await this.modalController.create({
      component: CreateUserPage,
      cssClass: 'my-custom-class',
      componentProps: {}
    });
    await modal.present();
    await modal.onDidDismiss();
    await this.getUsuarios();
  }

  // public async getAllPremio() {
  //   try {
  //     this.listado = await this.api.getAllPremios();
  //     console.log(this.listado);
  //   } catch (error) {
  //     console.log(error);
  //     this.listado = null;
  //   }

  // }

  // public async createPremio() {

  //   let newPremio: Premio = {
  //     id: -1,
  //     description: "hola soy un premio",
  //     entregado: false
  //   };

  //   try {
  //     this.premio = await this.api.createPremio(newPremio);
  //     console.log(this.premio);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // public async updatePremio() {

  //   let newPremio: Premio = {
  //     id: 8,
  //     description: "hola soy un premio editado",
  //     entregado: false
  //   };

  //   try {
  //     this.premio = await this.api.updatePremio(newPremio);
  //     console.log(this.premio);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // public async deletePremio() {
  //   try {
  //     await this.api.deletePremio(6);
  //     console.log(this.premio);
  //   } catch (error) {
  //     console.log(error);
  //     this.premio = null;
  //   }

  // }

  // public async getByDescription() {
  //   try {
  //     this.listado = await this.api.getPremioByDescription("telepollo");
  //     console.log(this.listado);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // public async getPremiosEntregados() {
  //   try {
  //     this.listado = await this.api.getPremiosEntregados();
  //     console.log(this.listado);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // public async getPremiosNoEntregados() {
  //   try {
  //     this.listado = await this.api.getPremiosNoEntregados();
  //     console.log(this.listado);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}